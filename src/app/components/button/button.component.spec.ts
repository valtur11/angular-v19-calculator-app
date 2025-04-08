import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';
import { CalculatorButton } from '../../calculator/model/calculator-button-type';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    // Set required inputs
    const expectedText = '+';
    const expectedButtonId = CalculatorButton.Add;
    const expectedIsPrimary = true;

    fixture.componentRef.setInput('text', expectedText);
    fixture.componentRef.setInput('buttonId', expectedButtonId);
    fixture.componentRef.setInput('isPrimary', expectedIsPrimary);

    fixture.detectChanges(); // Trigger initial data binding

    // Find the button element
    button = fixture.debugElement.query(By.css('.button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when button is clicked', () => {
    spyOn(component.onClick, 'emit');

    // Simulate button click
    button.triggerEventHandler('click', null);

    // Assert that the emitter's emit method was called with the correct value
    expect(component.onClick.emit).toHaveBeenCalledWith(CalculatorButton.Add);
  });
});
