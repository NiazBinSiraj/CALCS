import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './root-components/nav-bar/nav-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { SuperAdminModule } from './super-admin/super-admin.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SuperAdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
