import { Component } from '@angular/core';
import { OscComponentComponent } from '../../com/osc-component/osc-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [OscComponentComponent, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  selectedCountry: string = ''; 

  countries = [
    { value: 'option1', name: 'Option 1' },
    { value: 'option2', name: 'Option 2' },
    { value: 'option3', name: 'Option 3' }
  ];
  categories = [
    { value: 'option1', name: 'Option 1' },
    { value: 'option2', name: 'Option 2' },
    { value: 'option3', name: 'Option 3' }
  ];
  years = [
    { value: 'option1', name: 'Option 1' },
    { value: 'option2', name: 'Option 2' },
    { value: 'option3', name: 'Option 3' }
  ];
}
