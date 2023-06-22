import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorsComponent } from './views/moderators/moderators.component';
import { ModeratorsRoutingModule } from './moderators.routing';
import { SharedModule } from '../shared/shared.module';
import { ModeratorCardComponent } from './components/moderator-card/moderator-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ModeratorsComponent, ModeratorCardComponent],
  imports: [
    CommonModule,
    ModeratorsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ModeratorsModule {}
