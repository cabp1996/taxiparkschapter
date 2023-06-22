import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorsComponent } from './views/moderators/moderators.component';

const routes: Routes = [
  {
    path: '',
    component: ModeratorsComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ModeratorsRoutingModule {}
