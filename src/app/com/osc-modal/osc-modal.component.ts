import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-osc-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './osc-modal.component.html',
  styleUrl: './osc-modal.component.css'
})
export class OscModalComponent {
  isVisible = false;

  @Input() name: string = 'OSC NAME';
  @Input() imgSrc: string = '';
  @Input() date: string = '';
  @Input() place: string = '';
  @Input() category: string = '';

  openModal(name:string, imgSrc:string, date:string, place:string, category:string) {
    this.isVisible = true;
    this.name = name;
    this.imgSrc = imgSrc;
    this.date = date;
    this.place = place;
    this.category = category;
    document.body.style.overflow = 'hidden';

  }

  closeModal() {
    this.isVisible = false;
    document.body.style.overflow = '';
  }

}
