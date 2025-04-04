import { Component } from '@angular/core';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { CalculatorDisplayComponent } from './calculator-display/calculator-display.component';

@Component({
  selector: 'app-calculator',
  imports: [WrapperComponent, CalculatorDisplayComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  standalone: true,
})
export class CalculatorComponent {}
