import { Component, inject, signal } from '@angular/core';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { CalculatorDisplayComponent } from './calculator-display/calculator-display.component';
import { CalculatorButtonsComponent } from './calculator-buttons/calculator-buttons.component';
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
    CalculatorButtonsComponent,
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

  private updateExpression(input: string, currentValue: string): string {
    const isDecimal = input === '.';
    if (isDecimal) {
      return currentValue === '0' ? '0.' : `${currentValue}.`;
    } else {
      return currentValue === '0' ? input : `${currentValue}${input}`;
    }
  }

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
          this.clearEntry();
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

        case CalculatorButton.Multiply:
        case CalculatorButton.Add:
        case CalculatorButton.Square:
        case CalculatorButton.SquareRoot:
        case CalculatorButton.Reciprocal:
        case CalculatorButton.Percent:
        case CalculatorButton.Negate:
        case CalculatorButton.Divide:
        case CalculatorButton.Subtract:
          if (
            button === CalculatorButton.Subtract &&
            this.currentExpression() === '0' &&
            this.operation() === null
          ) {
            this.numberA.set(0);
            this.lastExpression.set('0 -');
            this.operation.set(CalculatorOperation.Subtract);
            this.isNumberBPlaceholder.set(true);
            this.numberB.set(0);
            this.currentExpression.set('0');
          } else if (button in CalculatorButtonToOperationMap) {
            const operation = CalculatorButtonToOperationMap[button]!;
            this.handleOperationInput(operation);
          } else {
            throw new Error('Invalid operation');
          }
          break;
        case CalculatorButton.Delete:
          this.handleDelete();
          break;
        default:
          throw new Error('Invalid button');
      }
    } catch (error: any) {
      this.currentExpression.set(error?.message || 'Error');
    }
  }

  handleNumberInput(input: string) {
    if (this.operation() === null) {
      // Handle numberA
      const updatedValue = this.updateExpression(
        input,
        this.currentExpression()
      );
      this.currentExpression.set(updatedValue);
      this.numberA.set(parseFloat(updatedValue));
    } else {
      // Handle numberB
      if (this.isNumberBPlaceholder()) {
        this.currentExpression.set(input === '.' ? '0.' : input);
        this.numberB.set(null);
        this.isNumberBPlaceholder.set(false);
      } else {
        const updatedValue = this.updateExpression(
          input,
          this.currentExpression()
        );
        this.currentExpression.set(updatedValue);
      }
      this.numberB.set(parseFloat(this.currentExpression()));
    }
  }

  private handleUnaryOperation(
    operation: CalculatorOperation,
    isNumberA: boolean
  ) {
    const targetNumber = isNumberA ? this.numberA() : this.numberB();
    if (targetNumber !== null) {
      const result = this.calculatorService.evaluateUnaryOperation(
        targetNumber,
        operation
      );
      const label = this.calculatorService.formatUnaryOperationLabel(
        operation,
        targetNumber
      );
      if (isNumberA) {
        this.numberA.set(result);
        this.lastExpression.set(label);
      } else {
        this.numberB.set(result);
        this.lastExpression.set(
          `${this.numberA()} ${
            CalculatorOperationLabels[this.lastOperation()!]
          } ${label}`
        );
      }
      this.currentExpression.set(`${result}`);
    }
  }

  private handleBinaryOperation(operation: CalculatorOperation) {
    if (this.numberA() !== null) {
      this.operation.set(operation);
      this.lastExpression.set(
        `${this.numberA()} ${CalculatorOperationLabels[operation]}`
      );
      this.numberB.set(this.numberA());
      this.isNumberBPlaceholder.set(true);
      this.currentExpression.set(`${this.numberB()}`);
    }
  }

  handleOperationInput(operation: CalculatorOperation) {
    try {
      if (
        operation === CalculatorOperation.Percent &&
        this.lastOperation() !== CalculatorOperation.Multiply
      ) {
        const base = this.numberB() === null ? 0 : this.numberA()!;
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
        [
          CalculatorOperation.Square,
          CalculatorOperation.SquareRoot,
          CalculatorOperation.Reciprocal,
          CalculatorOperation.Percent,
          CalculatorOperation.Negate,
        ].includes(operation)
      ) {
        const isNumberA = this.lastOperation() === null;
        this.handleUnaryOperation(operation, isNumberA);
      } else {
        this.handleBinaryOperation(operation);
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

  private handleDelete() {
    if (this.lastExpression() && this.operation() === null) {
      this.lastExpression.set(null); // Clear lastExpression after evaluation
      return;
    }
    if (this.operation() === null) {
      if (this.numberA() !== null) {
        // Remove the last digit or decimal point from numberA
        const currentValue = `${this.numberA()}`;
        const updatedValue = currentValue.slice(0, -1) || '0';
        this.numberA.set(parseFloat(updatedValue));
        this.currentExpression.set(updatedValue);
      }
    } else {
      if (this.numberB() !== null) {
        // Remove the last digit or decimal point from numberB
        const currentValue = `${this.numberB()}`;
        const updatedValue = currentValue.slice(0, -1) || '0';
        this.numberB.set(parseFloat(updatedValue));
        this.currentExpression.set(updatedValue);
      }
    }
  }

  clearEntry() {
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
