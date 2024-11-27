import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './com/landing/landing.component';
import { ContactoComponent } from './com/contacto/contacto.component';
import { ProjectsComponent } from './com/projects/projects.component';
import { AdminComponent } from './com/admin/admin.component';
import { CreateOSCComponent } from './com/create-osc/create-osc.component';
import { TableOSCComponent } from './com/table-osc/table-osc.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // Default route
  { path: 'contacto', component: ContactoComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create', component:CreateOSCComponent },
  { path: 'tableOSC', component:TableOSCComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
