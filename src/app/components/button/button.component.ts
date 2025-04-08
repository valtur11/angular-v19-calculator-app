import { Component, input, output } from '@angular/core';

import { CalculatorButton } from '../../calculator/model/calculator-button-type';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  text = input.required();
  buttonId = input.required<CalculatorButton>();
  onClick = output<CalculatorButton>();

  clickHandler() {
    this.onClick.emit(this.buttonId());
  }
}
