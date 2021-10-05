import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './clerk.component';
import { ClerkTabComponent } from './components/clerk-tab/clerk-tab.component';


@NgModule({
  declarations: [
    ClerkComponent,
    ClerkTabComponent
  ],
  imports: [
    CommonModule,
    ClerkRoutingModule
  ]
})
export class ClerkModule { }
