import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main.routing';
import { TimelineComponent } from './components/timeline/timeline.component';
import { WaterDropComponent } from './components/water-drop/water-drop.component';

@NgModule({
  declarations: [MainComponent, TimelineComponent, WaterDropComponent],
  imports: [CommonModule, SharedModule, MainRoutingModule],
})
export class MainModule {}
