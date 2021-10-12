import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdminTabComponent } from './components/super-admin-tab/super-admin-tab.component';
import { ClerksComponent } from './components/clerks/clerks.component';
import { ClerksTabComponent } from './components/clerks/clerks-tab/clerks-tab.component';
import { ClerksInfoComponent } from './components/clerks/clerks-info/clerks-info.component';
import { EntryNewClerkComponent } from './components/clerks/entry-new-clerk/entry-new-clerk.component';
import { OfficersComponent } from './components/officers/officers.component';
import { OfficersTabComponent } from './components/officers/officers-tab/officers-tab.component';
import { OfficersInfoComponent } from './components/officers/officers-info/officers-info.component';
import { EntryNewOfficerComponent } from './components/officers/entry-new-officer/entry-new-officer.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperAdminTabComponent,
    ClerksComponent,
    ClerksTabComponent,
    ClerksInfoComponent,
    EntryNewClerkComponent,
    OfficersComponent,
    OfficersTabComponent,
    OfficersInfoComponent,
    EntryNewOfficerComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
