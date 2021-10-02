import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClerkComponent } from './clerk.component';

const routes: Routes = [{ path: '', component: ClerkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
