import { Component, inject, signal } from '@angular/core';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { CalculatorDisplayComponent } from './calculator-display/calculator-display.component';
import { CalculatorButonsComponent } from './calculator-buttons/calculator-buttons.component';
import {
  CalculatorOperation,
  CalculatorService,
  CalculatorOperationLabels,
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
    try {
      switch (button) {
        case CalculatorButton.Decimal:
          if (this.currentExpression().includes('.')) return; // Prevent multiple decimals
          this.handleNumberInput('.');
          break;
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
            throw new Error('Invalid operation');
          }
          break;
        case CalculatorButton.Delete:
          if (this.operation() === null) {
            if (this.numberA() !== null) {
              // Remove the last digit or decimal point
              const currentValue = `${this.numberA()}`;
              const updatedValue = currentValue.slice(0, -1) || '0';
              this.numberA.set(parseFloat(updatedValue));
              this.currentExpression.set(updatedValue);
            }
          } else {
            if (this.numberB() !== null) {
              // Remove the last digit or decimal point
              const currentValue = `${this.numberB()}`;
              const updatedValue = currentValue.slice(0, -1) || '0';
              this.numberB.set(parseFloat(updatedValue));
              this.currentExpression.set(updatedValue);
            }
          }
          break;
        default:
          throw new Error('Invalid button');
      }
      console.log(
        '(main view) Button clicked:',
        CalculatorButtonLabels[button],
        'Enum:',
        button
      );
    } catch (error: any) {
      this.currentExpression.set(error?.message || 'Error');
    }
  }

  handleNumberInput(input: string) {
    const isDecimal = input === '.';

    if (this.operation() === null) {
      // Handle numberA
      const currentValue = this.currentExpression();
      if (isDecimal) {
        this.currentExpression.set(
          currentValue === '0' ? '0.' : `${currentValue}.`
        );
      } else {
        this.currentExpression.set(
          currentValue === '0' ? input : `${currentValue}${input}`
        );
      }
      this.numberA.set(parseFloat(this.currentExpression()));
    } else {
      // Handle numberB
      const currentValue = this.currentExpression();
      if (this.isNumberBPlaceholder()) {
        this.currentExpression.set(isDecimal ? '0.' : input);
        this.numberB.set(null);
        this.isNumberBPlaceholder.set(false);
      } else {
        if (isDecimal) {
          this.currentExpression.set(
            currentValue === '0' ? '0.' : `${currentValue}.`
          );
        } else {
          this.currentExpression.set(
            currentValue === '0' ? input : `${currentValue}${input}`
          );
        }
      }
      this.numberB.set(parseFloat(this.currentExpression()));
    }
  }
  handleOperationInput(operation: CalculatorOperation) {
    try {
      //Handle percent as a binary operation - edge case
      if (
        operation === CalculatorOperation.Percent &&
        this.lastOperation() != CalculatorOperation.Multiply
      ) {
        let base = this.numberA()!;
        if (this.numberB() === null) base = 0;
        const percentValue = this.numberB() ?? this.numberA()!;
        const result = this.calculatorService.evaluateBinaryOperation(
          base,
          percentValue,
          CalculatorOperation.Percent
        );
        this.lastExpression.set(
          `${base} ${
            CalculatorOperationLabels[this.lastOperation()!]
          } ${percentValue}`
        );
        this.numberA.set(base);
        this.numberB.set(result);
        this.operation.set(this.lastOperation());
        this.currentExpression.set(`${result}`);
        return;
      }

      if (
        operation === CalculatorOperation.Square ||
        operation === CalculatorOperation.SquareRoot ||
        operation === CalculatorOperation.Reciprocal ||
        operation === CalculatorOperation.Percent ||
        operation === CalculatorOperation.Negate
      ) {
        let isNumberA = this.lastOperation() === null; // if false, it's unary operation on numberB
        // Handle unary operations
        let result: number | null = null;
        if (isNumberA && this.numberA() !== null) {
          // if below is true, it means percent is being used as a unary operation
          result = this.calculatorService.evaluateUnaryOperation(
            this.numberA()!,
            operation
          );
          this.lastExpression.set(
            `${this.calculatorService.formatUnaryOperationLabel(
              operation,
              this.numberA()!
            )}`
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
            } ${this.calculatorService.formatUnaryOperationLabel(
              operation,
              this.numberB()!
            )}`
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
    } catch (error: any) {
      this.currentExpression.set(error?.message || 'Error');
    }
  }

  evaluateExpression() {
    if (
      this.numberA() !== null &&
      this.numberB() !== null &&
      this.operation() !== null
    ) {
      try {
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
      } catch (error: any) {
        this.currentExpression.set(error?.message || 'Error');
      }
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
