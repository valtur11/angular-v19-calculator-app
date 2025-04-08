import { Component, inject, signal } from '@angular/core';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { CalculatorDisplayComponent } from './calculator-display/calculator-display.component';
import { CalculatorButonsComponent } from './calculator-buttons/calculator-buttons.component';
import {
  CalculatorOperation,
  CalculatorService,
  CalculatorOperationLabels,
  formatUnaryOperationLabel,
} from './services/calculator.service';
import {
  CalculatorButton,
  CalculatorButtonLabels,
} from './model/calculator-button-type';

export const CalculatorButtonToOperationMap: Partial<
  Record<CalculatorButton, CalculatorOperation>
> = {
  [CalculatorButton.Add]: CalculatorOperation.Add,
  [CalculatorButton.Subtract]: CalculatorOperation.Subtract,
  [CalculatorButton.Multiply]: CalculatorOperation.Multiply,
  [CalculatorButton.Divide]: CalculatorOperation.Divide,
  [CalculatorButton.Square]: CalculatorOperation.Square,
  [CalculatorButton.SquareRoot]: CalculatorOperation.SquareRoot,
  [CalculatorButton.Reciprocal]: CalculatorOperation.Reciprocal,
  [CalculatorButton.Percent]: CalculatorOperation.Percent,
  [CalculatorButton.Negate]: CalculatorOperation.Negate,
};
@Component({
  selector: 'app-calculator',
  imports: [
    WrapperComponent,
    CalculatorDisplayComponent,
    CalculatorButonsComponent,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  standalone: true,
})
export class CalculatorComponent {
  currentExpression = signal('0');
  lastExpression = signal<string | null>(null);
  numberA = signal<number | null>(null);
  numberB = signal<number | null>(null);
  operation = signal<CalculatorOperation | null>(null);
  lastOperation = signal<CalculatorOperation | null>(null);
  isNumberBPlaceholder = signal<boolean>(false); // Flag to track if numberB is placeholder
  private calculatorService = inject(CalculatorService);

  onButtonClick(button: CalculatorButton) {
    switch (button) {
      //@Todo: handle all buttons
      case CalculatorButton.Clear:
        this.clear();
        break;
      case CalculatorButton.ClearEntry:
        this.lastOperation.set(null);
        // this.isNumberBPlaceholder.set(false);
        // the condition statement below handles if result is given already
        if (this.numberA !== null && this.operation() === null) {
          this.lastExpression.set(null);
        }
        if (this.operation() === null) {
          this.numberA.set(null);
          this.currentExpression.set('0');
        } else {
          this.numberB.set(null);
          this.currentExpression.set('0');
        }
        break;
      case CalculatorButton.One:
      case CalculatorButton.Two:
      case CalculatorButton.Three:
      case CalculatorButton.Four:
      case CalculatorButton.Five:
      case CalculatorButton.Six:
      case CalculatorButton.Seven:
      case CalculatorButton.Eight:
      case CalculatorButton.Nine:
      case CalculatorButton.Zero:
        this.handleNumberInput(CalculatorButtonLabels[button]);
        break;
      case CalculatorButton.Equals:
        this.evaluateExpression();
        break;
      case CalculatorButton.Divide:
      case CalculatorButton.Multiply:
      case CalculatorButton.Subtract:
      case CalculatorButton.Add:
      case CalculatorButton.Square:
      case CalculatorButton.SquareRoot:
      case CalculatorButton.Reciprocal:
      case CalculatorButton.Percent:
      case CalculatorButton.Negate:
        if (button in CalculatorButtonToOperationMap) {
          const operation = CalculatorButtonToOperationMap[button]!;
          this.handleOperationInput(operation);
        } else {
          throw new Error('Invalid operation'); // @TODO: handle this error
        }
        break;
      default:
        throw new Error('Invalid button'); // @TODO: handle this error
    }
    console.log(
      '(main view) Button clicked:',
      CalculatorButtonLabels[button],
      'Enum:',
      button
    );
  }
  handleNumberInput(input: string) {
    //@Todo handle decimals and deletions
    if (this.operation() === null) {
      this.numberA.set(Number(`${this.numberA() ?? ''}${input}`));
      this.currentExpression.set(`${this.numberA()}`);
    } else {
      if (this.isNumberBPlaceholder()) {
        this.numberB.set(null);
        this.isNumberBPlaceholder.set(false);
      }
      this.numberB.set(Number(`${this.numberB() ?? ''}${input}`));
      this.currentExpression.set(` ${this.numberB()}`);
    }
  }

  handleOperationInput(operation: CalculatorOperation) {
    if (
      operation === CalculatorOperation.Square ||
      operation === CalculatorOperation.SquareRoot ||
      operation === CalculatorOperation.Reciprocal ||
      operation === CalculatorOperation.Percent ||
      operation === CalculatorOperation.Negate
    ) {
      let isNumberA = this.lastOperation() === null; // if false, it's unary operation on numberB
      // Handle unary operations
      //@Todo handle perecentage
      let result: number | null = null;
      if (isNumberA && this.numberA() !== null) {
        result = this.calculatorService.evaluateUnaryOperation(
          this.numberA()!,
          operation
        );
        this.lastExpression.set(
          `${formatUnaryOperationLabel(operation, this.numberA()!)}`
        );
        this.numberA.set(result);
      } else if (this.numberB() !== null) {
        result = this.calculatorService.evaluateUnaryOperation(
          this.numberB()!,
          operation
        );
        this.lastExpression.set(
          `${this.numberA()} ${
            CalculatorOperationLabels[this.lastOperation()!]
          } ${formatUnaryOperationLabel(operation, this.numberB()!)}`
        );
        this.numberB.set(result);
      }
      if (result !== null) {
        this.currentExpression.set(`${result}`);
      }
    } else {
      // Handle binary operations
      if (this.numberA() !== null) {
        this.operation.set(operation);
        this.lastExpression.set(
          `${this.numberA()} ${CalculatorOperationLabels[this.operation()!]}`
        );
        this.numberB.set(this.numberA());
        this.isNumberBPlaceholder.set(true);
        this.currentExpression.set(`${this.numberB()}`);
      }
    }
    this.lastOperation.set(operation);
  }

  evaluateExpression() {
    if (
      this.numberA() !== null &&
      this.numberB() !== null &&
      this.operation() !== null
    ) {
      const result = this.calculatorService.evaluateBinaryOperation(
        this.numberA()!,
        this.numberB()!,
        this.operation()!
      );
      this.lastExpression.set(
        `${this.numberA()} ${
          CalculatorOperationLabels[this.operation()!]
        } ${this.numberB()} =`
      );
      this.numberA.set(result);
      this.numberB.set(null);
      this.operation.set(null);
      this.currentExpression.set(`${result}`);
    }
  }

  clear() {
    this.numberA.set(null);
    this.numberB.set(null);
    this.operation.set(null);
    this.currentExpression.set('0');
    this.lastExpression.set(null);
    this.isNumberBPlaceholder.set(false);
    this.lastOperation.set(null);
  }
}
