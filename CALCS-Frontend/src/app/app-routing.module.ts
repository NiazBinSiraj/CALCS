import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: 'superAdmin',
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  { 
    path: 'clerk',
    loadChildren: () => import('./clerk/clerk.module').then(m => m.ClerkModule)
  },
  {
    path: 'officer',
    loadChildren: () => import('./officer/officer.module').then(m => m.OfficerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
