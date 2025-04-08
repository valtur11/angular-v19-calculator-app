import { Component, input } from '@angular/core';
@Component({
  selector: 'app-calculator-display',
  imports: [],
  templateUrl: './calculator-display.component.html',
  styleUrl: './calculator-display.component.css',
})
export class CalculatorDisplayComponent {
  bigDisplayValue = input.required<string>();
  smallDisplayValue = input<string | null>(null);
}
