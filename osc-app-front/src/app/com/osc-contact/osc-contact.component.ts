import { Component,Input,Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-osc-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './osc-contact.component.html',
  styleUrl: './osc-contact.component.css'
})
export class OscContactComponent {
  isVisible = true;

  name: string = '';
  phone: string = '';
  email: string = '';
  @Input() info: any = {};

  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  openModal(info:any) {
    this.isVisible = true;
    this.name = info.nombre;
    this.phone = info.telefono;
    this.email = info.email;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

}
