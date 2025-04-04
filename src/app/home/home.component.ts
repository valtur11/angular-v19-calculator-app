import { Component } from '@angular/core';
import { WrapperComponent } from '../components/wrapper/wrapper.component';

@Component({
  selector: 'app-home',
  imports: [WrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {}
