import { AppState } from 'src/app-state';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { ClerkServiceService } from '../services/clerkService/clerk-service.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  requesting:boolean = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == "Enter") this.OnClickLogin();
  }

  credential = {
    username: "",
    password: ""
  };

  constructor(private authService: AuthserviceService, private router: Router, private clerkService: ClerkServiceService) { }

  ngOnInit(): void {

  }

  OnEditUsername(event: any) {
    this.credential.username = event.target.value;
  }

  OnEditPassword(event: any) {
    this.credential.password = event.target.value;
  }

  async OnClickLogin() {
    this.requesting = true;
    await this.authService.Login(this.credential).then(async (res) => {
      AppState.instance.access_token = res.access;
      let decoded: any = jwt_decode(res.access);
      AppState.instance.user_id = decoded.user_id;
      await this.authService.GetUserType(decoded.user_id).then(async (res) => {
        if (res.type == "clerk") {
          AppState.instance.related_id = res.related_id;
          AppState.instance.user_type = "clerk";
          await this.clerkService.GetByID(AppState.instance.related_id).then((res) => {
            AppState.instance.username = res.user.username;
            AppState.instance.isLoggedIn = true;
            this.requesting = false;
            this.router.navigate(['clerk']);
          }).catch((err) =>{
            this.requesting = false;
            alert(err.error + " " + err.errorStatus);
            console.log(err);
          });
        }
        else {
          AppState.instance.user_type = "admin";
          AppState.instance.username = "Admin";
          AppState.instance.isLoggedIn = true;
          this.router.navigate(['superAdmin']);
        }
      }).catch((err) =>{
        this.requesting = false;
        alert(err.error + " " + err.errorStatus);
        console.log(err);
      });
    }).catch((err) =>{
      this.requesting = false;
      if(err.error.detail != null) alert(err.error.detail);
      else alert(err.error + " " + err.errorStatus);
      console.log(err);
    });
  }

  OnClickForgetPassword()
  {
    
  }

}
