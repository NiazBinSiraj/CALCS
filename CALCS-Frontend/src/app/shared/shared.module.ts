import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';


@NgModule({
  declarations: [
    LoadingBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    LoadingBarComponent
  ]
})
export class SharedModule { }
