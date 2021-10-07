import { AppState } from 'src/app-state';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { ClerkServiceService } from '../services/clerkService/clerk-service.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

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
    await this.authService.Login(this.credential).then(async (res) => {
      AppState.instance.access_token = res.access;
      let decoded: any = jwt_decode(res.access);
      AppState.instance.user_id = decoded.user_id;
      await this.authService.GetUserType(decoded.user_id).then(async (res) => {
        if (res.type == "clerk") {
          AppState.instance.related_id = res.related_id;
          AppState.instance.user_type = "clerk";
          await this.clerkService.GetByID(AppState.instance.related_id).then((res) => {
            AppState.instance.clerkUser.username = res.user.username;
            AppState.instance.clerkUser.email = res.user.email;
            AppState.instance.clerkUser.address = res.address;
            AppState.instance.clerkUser.contact = res.contact;
            AppState.instance.clerkUser.password = res.password;
            AppState.instance.clerkUser.rank = res.rank;
            AppState.instance.clerkUser.subunit = res.subunit;
            AppState.instance.clerkUser.unit = res.unit;
            AppState.instance.clerkUser.personal_no = res.personal_no;
            AppState.instance.clerkUser.profile_pic = res.profile_pic;

            AppState.instance.isLoggedIn = true;
            this.router.navigate(['clerk']);
          }).catch(console.error);
        }
        else {
          AppState.instance.user_type = "admin";
          AppState.instance.username = "admin";
          AppState.instance.isLoggedIn = true;
          this.router.navigate(['superAdmin']);
        }
      }).catch(console.error);
    }).catch(console.error);
  }

}
