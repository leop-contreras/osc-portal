import { Component, AfterViewInit, ViewChild, ViewContainerRef, Injector, ApplicationRef, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { OscComponentComponent } from '../../com/osc-component/osc-component.component';
import { HttpClient,HttpHeaders,HttpResponse  } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OscModalComponent } from '../osc-modal/osc-modal.component';
import { SqlService } from '../../srv/sql.service';
import { OscContactComponent } from "../osc-contact/osc-contact.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [OscComponentComponent, FormsModule, CommonModule, OscModalComponent, OscContactComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']  // Corrected to `styleUrls`
})
export class LandingComponent implements AfterViewInit {
  selectedCountry: string = '';
  selectedCategory: string = '';
  selectedYear: string = '';

  countries: any[] = [];
  categories: any[] = [];
  years: any[] = [];

  osclist: any = [];
  proyects: any 
  contactOpened: boolean = false;
  query: string = `
      SELECT 
        osc.id, osc.nombre AS nombre, osc.descripcion, categorias.nombre AS categoria
      FROM 
        osc
      LEFT JOIN 
        categorias ON osc.id_categoria = categorias.id
      WHERE 
    `;

  @ViewChild('oscBigContainer', { read: ViewContainerRef, static: true })
  oscBigContainer!: ViewContainerRef;
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private sql:SqlService,
    private renderer: Renderer2, private el: ElementRef,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void{
    let r = this.sql.query(this.query,"select");
    this.osclist = r.length>0 ? r : [];
    console.log(this.osclist);

    this.showCategorias();
    this.showCountry();
    this.showFundacion();
    this.fetchFilteredOscList();
  }

  ngAfterViewInit(): void {
    this.addOscComponents();
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }

  showCategorias(): void {
    const query2 = 'SELECT id, nombre FROM categorias';
    let result = this.sql.query(query2, 'select');
    this.categories = result.length > 0 ? result : [];
    console.log(this.categories);
  }

  showCountry(): void {
    const query2 = 'SELECT DISTINCT estado, id FROM osc GROUP BY estado';
    let result = this.sql.query(query2, 'select');
    this.countries = result.length > 0 ? result : [];
    console.log(this.countries);
  }

  showFundacion(): void {
    const query = 'SELECT DISTINCT SUBSTRING(fundacion, 7, 4) AS year FROM osc GROUP BY year ORDER BY year DESC';
    let result = this.sql.query(query, 'select');
    this.years = result.length > 0 ? result : [];
    console.log(this.years);
  }

  search(value:string): void{
    this.filterClear();
    let searchQuery = `SELECT 
      osc.id, osc.nombre AS nombre, osc.descripcion, categorias.nombre AS categoria
    FROM 
      osc
    LEFT JOIN 
      categorias ON osc.id_categoria = categorias.id
    WHERE osc.nombre LIKE '%${value}%' 
    OR categorias.nombre LIKE '%${value}%'
    `;
    let r = this.sql.query(searchQuery, 'select');
    this.osclist = r.length > 0 ? r : [];
    console.log(this.osclist);
    this.addOscComponents(); 
  }

  searchClear():void{
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this.search('');
  }

  fetchFilteredOscList(): void {
    let query = this.query;

    const conditions: string[] = [];

    if (this.selectedCategory) {
      conditions.push(`osc.id_categoria = ${this.selectedCategory}`);
    }

    if (this.selectedCountry) {
      conditions.push(`osc.estado = '${this.selectedCountry}'`);
    }

    if (this.selectedYear) {
      conditions.push(`SUBSTRING(osc.fundacion, 7, 4) = '${this.selectedYear}'`);
    }

    if (conditions.length > 0) {
      query += conditions.join(' AND ');
    } else {
      query += '1'; // No aplica filtros si no hay selección
    }

    let result = this.sql.query(query, 'select');
    this.osclist = result.length > 0 ? result : [];
    console.log(this.osclist);
    this.addOscComponents(); 
  }

  onFilterChange(): void {
    this.fetchFilteredOscList(); 
  }

  filterClear(filter?:any): void{
    switch(filter){
      case "Country":
        this.selectedCountry = "";
        break;
      case "Category":
        this.selectedCategory = "";
        break;
      case "Year":
        this.selectedYear = "";
        break;
      default:
        this.selectedCountry = "";
        this.selectedCategory = "";
        this.selectedYear = "";
        break;
    }
    this.onFilterChange();
  }
  
  private addOscComponents(): void {
    const containerElement = this.oscBigContainer.element.nativeElement;
    containerElement.innerHTML = '';
    for (let i = 0; i < this.osclist.length; i++) {
      // Dynamically create component
      const componentRef = this.oscBigContainer.createComponent(OscComponentComponent);

      componentRef.instance.id = this.osclist[i].id;
      componentRef.instance.name = this.osclist[i].nombre;
      componentRef.instance.category = this.osclist[i].categoria;
      componentRef.instance.desc = this.osclist[i].descripcion;
      componentRef.instance.imgSrc = '/osc-logo/osc-default.webp'; 

      this.checkFileExists(`/osc-logo/${this.osclist[i].nombre}.webp`).subscribe(exists => {
        if (exists) {
          componentRef.instance.imgSrc = `/osc-logo/${this.osclist[i].nombre}.webp`; 
        }
      });
  
      // Append the native element to the oscBigContainer
      componentRef.instance.clicked.subscribe(() => this.openModal(0,componentRef.instance.id));
      const containerElement = this.oscBigContainer.element.nativeElement;
      containerElement.appendChild(componentRef.location.nativeElement);
    }
  }

  closeModal(index: number){
    if (this.modalContainer.length > index) {
      this.modalContainer.remove(index);
      this.contactOpened = false;
    }

    if(this.modalContainer.length == 0){
      const modalElement = this.el.nativeElement.querySelector('.modal-container');
      if (modalElement) {
        this.renderer.setStyle(modalElement, 'opacity', '0');
        this.renderer.setStyle(modalElement, 'transition', 'opacity 250ms ease');
        setTimeout(() => {
          this.renderer.setStyle(modalElement, 'display', 'none');
        }, 250);
      }
    }
  }

  openModal(index:number, id:string){
    const containerElement = this.modalContainer.element.nativeElement;

    if(this.modalContainer.length == 0){
      const modalElement = this.el.nativeElement.querySelector('.modal-container');
      if (modalElement) {
        this.renderer.setStyle(modalElement, 'transition', 'opacity 250ms ease');
        this.renderer.setStyle(modalElement, 'display', 'flex');
        setTimeout(() => {
          this.renderer.setStyle(modalElement, 'opacity', '1');
        },10)
      }
    }
    
    if(index == 0){
      const oscComponentRef = this.modalContainer.createComponent(OscModalComponent);
      containerElement.appendChild(oscComponentRef.location.nativeElement);

      let oscModalQuery = this.sql.query('SELECT osc.id, osc.nombre AS nombre, descripcion, fundacion, estado, pais, email, categorias.nombre AS categoria FROM `osc` LEFT JOIN `categorias` ON osc.id_categoria = categorias.id WHERE osc.id = '+id,"select");
      let oscModalInfo = oscModalQuery.length>0 ? oscModalQuery : [];
      let proyectsQuery = this.sql.query('SELECT * FROM `proyectos` WHERE id_osc ='+id,"select");
      let proyectsInfo = proyectsQuery.length>0 ? proyectsQuery : [];

      let oscInfo: any = {
        id: oscModalInfo[0].id,
        name: oscModalInfo[0].nombre,
        desc: oscModalInfo[0].descripcion,
        imgSrc: `/osc-logo/osc-default.webp`,
        date: oscModalInfo[0].fundacion,
        place: oscModalInfo[0].estado+', '+oscModalInfo[0].pais,
        category: oscModalInfo[0].categoria,
        parentDiv: this.oscBigContainer.element.nativeElement,
        proyects: proyectsInfo
      };

      this.checkFileExists(`/osc-logo/${oscModalInfo[0].nombre}.webp`).subscribe(exists => {
        if (exists) {
          oscComponentRef.instance.imgSrc = `/osc-logo/${oscModalInfo[0].nombre}.webp`; 
        }
      });

      oscComponentRef.instance.openModal(oscInfo);
      oscComponentRef.instance.modalClosed.subscribe(() => {
        this.closeModal(1);
        this.closeModal(0);
        document.body.style.overflow = '';
      });
      oscComponentRef.instance.contactOpen.subscribe(() => {
        if(!this.contactOpened){
          this.openModal(1,id);
          this.contactOpened = true;
        }
      });
    }else{
      const contactComponentRef = this.modalContainer.createComponent(OscContactComponent);
      containerElement.appendChild(contactComponentRef.location.nativeElement);
      contactComponentRef.instance.modalClosed.subscribe(() => {
        this.closeModal(1);
      });
      let contactoQuery = this.sql.query('SELECT * FROM `contactos` WHERE id ='+id,"select");
      let contactoInfo = contactoQuery.length>0 ? contactoQuery : [];
      console.log(contactoInfo);
      contactComponentRef.instance.openModal(contactoInfo[0]);
    }
  }

  onDivClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const container = event.currentTarget as HTMLElement;
  
    if (target === container) {
      this.closeModal(1);
      this.closeModal(0);
      document.body.style.overflow = '';
    }
  }

  checkFileExists(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200 || response.status === 304) {
          return true;  // File exists (including cached files)
        }
        return false;  // File doesn't exist (404 or other errors)
      }),
      catchError(() => of(false))  // Return false in case of any error (like network issues)
    );
  }
}