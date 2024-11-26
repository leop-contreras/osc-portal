import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './com/navbar/navbar.component';
import { ContactoComponent } from './com/contacto/contacto.component';
import { ProjectsComponent } from './com/projects/projects.component';
import { OscModalComponent } from "./com/osc-modal/osc-modal.component";
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactoComponent,
    ProjectsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, OscModalComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
