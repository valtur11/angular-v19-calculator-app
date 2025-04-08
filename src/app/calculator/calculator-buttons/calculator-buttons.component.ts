import { Component, output, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import {
  CalculatorButton,
  CalculatorButtonLabels,
} from '../model/calculator-button-type';

@Component({
  selector: 'app-calculator-buttons',
  imports: [ButtonComponent],
  templateUrl: './calculator-buttons.component.html',
  styleUrl: './calculator-buttons.component.css',
})
export class CalculatorButonsComponent {
  buttons = Object.values(CalculatorButton).filter(
    (value) => typeof value === 'number'
  ) as CalculatorButton[];

  buttonClicked = output<CalculatorButton>();
  onButtonClick(button: CalculatorButton) {
    this.buttonClicked.emit(button);
  }

  getButtonLabel(button: CalculatorButton): string {
    return CalculatorButtonLabels[button];
  }
}
