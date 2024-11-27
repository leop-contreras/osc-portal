import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscContactComponent } from '../osc-contact/osc-contact.component';

@Component({
  selector: 'app-osc-modal',
  standalone: true,
  imports: [CommonModule, OscContactComponent],
  templateUrl: './osc-modal.component.html',
  styleUrl: './osc-modal.component.css'
})
export class OscModalComponent {
  isVisible = false;

  imgSrc: string = '';
  date: string = '';
  place: string = '';
  category: string = '';
  parentDiv: any = '';
  desc: string = '';

  @Input() name: string = 'OSC NAME';
  @Input() id: string = '';
  @Input() proyects: any = [];

  @ViewChild('contactModal') contactModal!: OscContactComponent;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() contactOpen: EventEmitter<void> = new EventEmitter<void>();

  openModal(info:any) {
    this.isVisible = true;
    this.id = info.id;
    this.name = info.name;
    this.imgSrc = info.imgSrc;
    this.date = info.date;
    this.place = info.place;
    this.category = info.category;
    this.parentDiv = info.parentDiv;
    this.desc = info.desc;
    this.proyects = info.proyects;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
    document.body.style.overflow = '';
  }

  openContact(){
    this.contactOpen.emit();
  }

}
