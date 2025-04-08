import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CalculatorDisplayComponent } from './calculator-display.component';

describe('CalculatorDisplayComponent', () => {
  let component: CalculatorDisplayComponent;
  let fixture: ComponentFixture<CalculatorDisplayComponent>;
  let bigDisplay: DebugElement;
  let smallDisplay: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorDisplayComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorDisplayComponent);
    component = fixture.componentInstance;

    // Set required inputs
    const expectedBigDisplayValue = '12345'; // Example value for the big display
    const expectedSmallDisplayValue = '678'; // Example value for the small display
    fixture.componentRef.setInput('bigDisplayValue', expectedBigDisplayValue);
    fixture.componentRef.setInput(
      'smallDisplayValue',
      expectedSmallDisplayValue
    );

    fixture.detectChanges(); // Trigger initial data binding

    // Find the display elements
    bigDisplay = fixture.debugElement.query(By.css('.big-display'));
    smallDisplay = fixture.debugElement.query(By.css('.small-display'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct big display value', () => {
    const bigDisplayElement: HTMLElement = bigDisplay.nativeElement;
    expect(bigDisplayElement.textContent).toContain('12345');
  });

  it('should display the correct small display value', () => {
    const smallDisplayElement: HTMLElement = smallDisplay.nativeElement;
    expect(smallDisplayElement.textContent).toContain('678');
  });
});
