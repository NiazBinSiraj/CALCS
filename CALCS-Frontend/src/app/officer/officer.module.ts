import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OfficerRoutingModule } from './officer-routing.module';
import { OfficerComponent } from './officer.component';
import { OfficerTabComponent } from './components/officer-tab/officer-tab.component';
import { HonourBoardComponent } from './components/honour-board/honour-board.component';
import { SoldiersInfoComponent } from './components/soldiers-info/soldiers-info.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { PunishmentComponent } from './components/punishment/punishment.component';


@NgModule({
  declarations: [
    OfficerComponent,
    OfficerTabComponent,
    HonourBoardComponent,
    SoldiersInfoComponent,
    PerformanceComponent,
    PunishmentComponent
  ],
  imports: [
    CommonModule,
    OfficerRoutingModule,
    SharedModule
  ]
})
export class OfficerModule { }
