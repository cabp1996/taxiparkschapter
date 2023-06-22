import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './views/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClientsRoutingModule {}
