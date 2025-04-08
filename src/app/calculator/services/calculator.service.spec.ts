import { TestBed } from '@angular/core/testing';
import { CalculatorService, CalculatorOperation } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('evaluateBinaryOperation', () => {
    it('should add two numbers', () => {
      expect(
        service.evaluateBinaryOperation(5, 3, CalculatorOperation.Add)
      ).toBe(8);
    });

    it('should subtract two numbers', () => {
      expect(
        service.evaluateBinaryOperation(5, 3, CalculatorOperation.Subtract)
      ).toBe(2);
    });

    it('should multiply two numbers', () => {
      expect(
        service.evaluateBinaryOperation(5, 3, CalculatorOperation.Multiply)
      ).toBe(15);
    });

    it('should divide two numbers', () => {
      expect(
        service.evaluateBinaryOperation(6, 3, CalculatorOperation.Divide)
      ).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() =>
        service.evaluateBinaryOperation(6, 0, CalculatorOperation.Divide)
      ).toThrowError('Cannot divide by zero');
    });

    it('should calculate percentage', () => {
      expect(
        service.evaluateBinaryOperation(50, 20, CalculatorOperation.Percent)
      ).toBe(10);
    });
  });

  describe('evaluateUnaryOperation', () => {
    it('should calculate the square of a number', () => {
      expect(
        service.evaluateUnaryOperation(4, CalculatorOperation.Square)
      ).toBe(16);
    });

    it('should calculate the square root of a number', () => {
      expect(
        service.evaluateUnaryOperation(9, CalculatorOperation.SquareRoot)
      ).toBe(3);
    });

    it('should throw an error for square root of a negative number', () => {
      expect(() =>
        service.evaluateUnaryOperation(-9, CalculatorOperation.SquareRoot)
      ).toThrowError('Cannot take square root of negative number');
    });

    it('should calculate the reciprocal of a number', () => {
      expect(
        service.evaluateUnaryOperation(2, CalculatorOperation.Reciprocal)
      ).toBe(0.5);
    });

    it('should negate a number', () => {
      expect(
        service.evaluateUnaryOperation(5, CalculatorOperation.Negate)
      ).toBe(-5);
    });

    it('should negate a negated number', () => {
      let negated = service.evaluateUnaryOperation(
        5,
        CalculatorOperation.Negate
      );
      expect(
        service.evaluateUnaryOperation(negated, CalculatorOperation.Negate)
      ).toBe(5);
    });

    it('should calculate percentage as a unary operation', () => {
      expect(
        service.evaluateUnaryOperation(50, CalculatorOperation.Percent)
      ).toBe(0.5);
    });
  });

  describe('formatUnaryOperationLabel', () => {
    it('should format square operation label', () => {
      expect(
        service.formatUnaryOperationLabel(CalculatorOperation.Square, 4)
      ).toBe('square(4)');
    });

    it('should format square root operation label', () => {
      expect(
        service.formatUnaryOperationLabel(CalculatorOperation.SquareRoot, 9)
      ).toBe('sqrt(9)');
    });

    it('should format reciprocal operation label', () => {
      expect(
        service.formatUnaryOperationLabel(CalculatorOperation.Reciprocal, 2)
      ).toBe('1/(2)');
    });

    it('should format negate operation label', () => {
      expect(
        service.formatUnaryOperationLabel(CalculatorOperation.Negate, 5)
      ).toBe('negate(5)');
    });

    it('should format percentage operation label', () => {
      expect(
        service.formatUnaryOperationLabel(CalculatorOperation.Percent, 50)
      ).toBe('0.5');
    });
  });
});
