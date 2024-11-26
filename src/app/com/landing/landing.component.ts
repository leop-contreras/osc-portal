import { Component, AfterViewInit, ViewChild, ViewContainerRef, Injector, ApplicationRef } from '@angular/core';
import { OscComponentComponent } from '../../com/osc-component/osc-component.component';
import { FormsModule } from '@angular/forms';
import { OscModalComponent } from '../osc-modal/osc-modal.component';
import { SqlService } from '../../srv/sql.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [OscComponentComponent, FormsModule, OscModalComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']  // Corrected to `styleUrls`
})
export class LandingComponent implements AfterViewInit {
  selectedCountry: string = ''; 
  osclist: any = [];
  query: string = 'SELECT osc.nombre AS nombre, descripcion, fundacion, estado, pais, email, categorias.nombre AS categoria FROM `osc` LEFT JOIN `categorias` ON osc.id_categoria = categorias.id;';

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


  @ViewChild('myModal') myModal!: OscModalComponent;

  @ViewChild('oscBigContainer', { read: ViewContainerRef, static: true })
  oscBigContainer!: ViewContainerRef;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private sql:SqlService
  ) {}

  ngOnInit(): void{
    let r = this.sql.query(this.query,"select");
    this.osclist = r.length>0 ? r : [];
    console.log(this.osclist);
  }

  ngAfterViewInit(): void {
    this.addOscComponents();
  }
  
  private addOscComponents(): void {
    for (let i = 0; i < this.osclist.length; i++) {
      // Dynamically create component
      const componentRef = this.oscBigContainer.createComponent(OscComponentComponent);

      componentRef.instance.name = this.osclist[i].nombre;
      componentRef.instance.category = this.osclist[i].categoria;
      if(i <= 3){
        componentRef.instance.imgSrc = `/osc-logo/${this.osclist[i].nombre}.webp`;
      }else{
        componentRef.instance.imgSrc = `/osc-logo/osc-default.webp`;
      }
  
      // Attach the click event to myModal.openModal
      componentRef.instance.clicked.subscribe(() => this.myModal.openModal(
        componentRef.instance.name, 
        componentRef.instance.imgSrc, 
        this.osclist[i].fundacion,
        this.osclist[i].estado+', '+this.osclist[i].pais,
        this.osclist[i].categoria
      ));
  
      // Append the native element to the oscBigContainer
      const containerElement = this.oscBigContainer.element.nativeElement;
      containerElement.appendChild(componentRef.location.nativeElement);
    }
  }
  
  
}
