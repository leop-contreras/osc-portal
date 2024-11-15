import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './com/navbar/navbar.component';
import { ContactoComponent } from './com/contacto/contacto.component';
import { ProjectsComponent } from './com/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactoComponent,
    ProjectsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
