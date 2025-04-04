import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, WrapperComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {}
