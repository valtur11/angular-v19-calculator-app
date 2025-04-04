import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-calculator-display',
  imports: [],
  templateUrl: './calculator-display.component.html',
  styleUrl: './calculator-display.component.css',
})
export class CalculatorDisplayComponent {
  displayValue = signal('0');
  onInput(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}
