import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-osc-component',
  standalone: true,
  templateUrl: './osc-component.component.html',
  styleUrl: './osc-component.component.css'
})
export class OscComponentComponent {
  @Input() name: string = 'OSC NAME';
  @Input() imgSrc: string = '';
  @Input() category: string = '';
  @Input() desc: string = '';
  @Input() id: string = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
