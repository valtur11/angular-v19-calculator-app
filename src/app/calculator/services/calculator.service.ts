import { Injectable } from '@angular/core';

export enum CalculatorOperation {
  Add,
  Subtract,
  Multiply,
  Divide,
  Square,
  SquareRoot,
  Reciprocal,
  Percent,
  Negate,
}

export const CalculatorOperationLabels: Record<CalculatorOperation, string> = {
  [CalculatorOperation.Add]: '+',
  [CalculatorOperation.Subtract]: '−',
  [CalculatorOperation.Multiply]: '×',
  [CalculatorOperation.Divide]: '÷',
  [CalculatorOperation.Square]: 'x²',
  [CalculatorOperation.SquareRoot]: '√x',
  [CalculatorOperation.Reciprocal]: '1/x',
  [CalculatorOperation.Percent]: '%',
  [CalculatorOperation.Negate]: '±',
};

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  evaluateBinaryOperation(
    a: number,
    b: number,
    operation: CalculatorOperation
  ) {
    switch (operation) {
      case CalculatorOperation.Add:
        return a + b;
      case CalculatorOperation.Subtract:
        return a - b;
      case CalculatorOperation.Multiply:
        return a * b;
      case CalculatorOperation.Divide:
        if (b === 0) {
          throw new Error('Cannot divide by zero');
        }
        return a / b;
      default:
        throw new Error('Invalid operation');
    }
  }
  evaluateUnaryOperation(a: number, operation: CalculatorOperation) {
    switch (operation) {
      case CalculatorOperation.Square:
        return a * a;
      case CalculatorOperation.SquareRoot:
        if (a < 0) {
          throw new Error('Cannot take square root of negative number');
        }
        return Math.sqrt(a);
      case CalculatorOperation.Reciprocal:
        return this.evaluateBinaryOperation(1, a, CalculatorOperation.Divide);
      case CalculatorOperation.Percent:
        return this.evaluateBinaryOperation(a, 100, CalculatorOperation.Divide);
      case CalculatorOperation.Negate:
        return -a;
      default:
        throw new Error('Invalid operation');
    }
  }
}
