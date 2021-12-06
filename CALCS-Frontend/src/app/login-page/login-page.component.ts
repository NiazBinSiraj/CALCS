import { OfficerServiceService } from './../services/officerService/officer-service.service';
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

  constructor(private authService: AuthserviceService, private router: Router, private clerkService: ClerkServiceService, private officerService:OfficerServiceService) { }

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
            
            AppState.instance.clerk.personal_no = res.personal_no;
            AppState.instance.clerk.username = res.user.username;
            AppState.instance.clerk.name = res.name;
            AppState.instance.clerk.email = res.user.email;
            AppState.instance.clerk.password = res.password;
            AppState.instance.clerk.unit = res.unit;
            AppState.instance.clerk.subunit = res.subunit;
            AppState.instance.clerk.rank = res.rank;
            AppState.instance.clerk.contact = res.contact;
            AppState.instance.clerk.address = res.address;
            AppState.instance.clerk.profile_pic = res.profile_clerk;
            AppState.instance.clerk.starting_date = res.starting_date;
            AppState.instance.clerk.ending_date = res.ending_date;

            AppState.instance.isLoggedIn = true;
            this.requesting = false;
            this.router.navigate(['clerk']);
          }).catch((err) =>{
            this.requesting = false;
            alert(err.error + " " + err.errorStatus);
            console.log(err);
          });
        }
        else if (res.type == "officer") {
          AppState.instance.related_id = res.related_id;
          AppState.instance.user_type = "officer";
          await this.officerService.GetByID(AppState.instance.related_id).then((res) => {
            AppState.instance.username = res.user.username;
            
            AppState.instance.officer.ba_no = res.ba_no;
            AppState.instance.officer.username = res.user.username;
            AppState.instance.officer.name = res.name;
            AppState.instance.officer.email = res.user.email;
            AppState.instance.officer.password = res.password;
            AppState.instance.officer.unit = res.unit;
            AppState.instance.officer.subunit = res.subunit;
            AppState.instance.officer.rank = res.rank;
            AppState.instance.officer.contact = res.contact;
            AppState.instance.officer.address = res.address;
            AppState.instance.officer.profile_pic = res.profile_clerk;
            AppState.instance.officer.starting_date = res.starting_date;
            AppState.instance.officer.ending_date = res.ending_date;
            AppState.instance.officer.appointment = res.appointment;

            AppState.instance.isLoggedIn = true;
            this.requesting = false;
            this.router.navigate(['officer']);
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
