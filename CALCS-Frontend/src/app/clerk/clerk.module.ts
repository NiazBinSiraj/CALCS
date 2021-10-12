import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './clerk.component';
import { ClerkTabComponent } from './components/clerk-tab/clerk-tab.component';
import { HonourBoardComponent } from './components/honour-board/honour-board.component';
import { SoldiersInfoComponent } from './components/soldiers-info/soldiers-info.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { PunishmentComponent } from './components/punishment/punishment.component';

import { SharedModule } from '../shared/shared.module';
import { SoldiersTabComponent } from './components/soldiers-info/soldiers-tab/soldiers-tab.component';
import { ViewSoldiersComponent } from './components/soldiers-info/view-soldiers/view-soldiers.component';
import { EntryNewSoldiersComponent } from './components/soldiers-info/entry-new-soldiers/entry-new-soldiers.component';


@NgModule({
  declarations: [
    ClerkComponent,
    ClerkTabComponent,
    HonourBoardComponent,
    SoldiersInfoComponent,
    PerformanceComponent,
    PunishmentComponent,
    SoldiersTabComponent,
    ViewSoldiersComponent,
    EntryNewSoldiersComponent
  ],
  imports: [
    CommonModule,
    ClerkRoutingModule,
    SharedModule
  ]
})
export class ClerkModule { }
