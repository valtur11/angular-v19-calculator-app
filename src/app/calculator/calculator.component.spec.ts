import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorButton } from './model/calculator-button-type';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle number input correctly', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Two);
    expect(component.currentExpression()).toBe('12');
  });

  it('should handle addition operation', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Add);
    component.onButtonClick(CalculatorButton.Two);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('3');
  });

  it('should handle subtraction operation', () => {
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Subtract);
    component.onButtonClick(CalculatorButton.Three);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('2');
  });

  it('should handle multiplication operation', () => {
    component.onButtonClick(CalculatorButton.Two);
    component.onButtonClick(CalculatorButton.Multiply);
    component.onButtonClick(CalculatorButton.Three);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('6');
  });

  it('should handle division operation', () => {
    component.onButtonClick(CalculatorButton.Six);
    component.onButtonClick(CalculatorButton.Divide);
    component.onButtonClick(CalculatorButton.Three);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('2');
  });

  it('should handle division by zero', () => {
    component.onButtonClick(CalculatorButton.Six);
    component.onButtonClick(CalculatorButton.Divide);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('Cannot divide by zero');
  });

  it('should clear the current expression', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Clear);
    expect(component.currentExpression()).toBe('0');
  });

  it('should handle square operation', () => {
    component.onButtonClick(CalculatorButton.Four);
    component.onButtonClick(CalculatorButton.Square);
    expect(component.currentExpression()).toBe('16');
  });

  it('should handle square root operation', () => {
    component.onButtonClick(CalculatorButton.Nine);
    component.onButtonClick(CalculatorButton.SquareRoot);
    expect(component.currentExpression()).toBe('3');
  });

  it('should handle percentage operation with only numberB', () => {
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    expect(component.currentExpression()).toBe('0');
  });

  it('should handle percentage operation with multiplication', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Multiply);
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('5');
  });

  it('should handle percentage operation with addition', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Add);
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('15');
  });

  it('should handle percentage operation as a unary operation on numberA', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    expect(component.currentExpression()).toBe('0');
  });

  it('should handle percentage operation as a unary operation on numberB', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Add);
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    expect(component.currentExpression()).toBe('5');
  });

  it('should handle percentage operation with subtraction', () => {
    component.onButtonClick(CalculatorButton.One);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Subtract);
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Zero);
    component.onButtonClick(CalculatorButton.Percent);
    component.onButtonClick(CalculatorButton.Equals);
    expect(component.currentExpression()).toBe('5');
  });

  it('should handle negate operation', () => {
    component.onButtonClick(CalculatorButton.Five);
    component.onButtonClick(CalculatorButton.Negate);
    expect(component.currentExpression()).toBe('-5');
  });
});
