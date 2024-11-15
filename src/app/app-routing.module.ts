import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './com/landing/landing.component';
import { ContactoComponent } from './com/contacto/contacto.component';
import { ProjectsComponent } from './com/projects/projects.component';
import { AdminComponent } from './com/admin/admin.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // Default route
  { path: 'contacto', component: ContactoComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
