import { Router } from '@angular/router';
import { AppState } from 'src/app-state';
import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Clerk } from 'src/app/models/clerk';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, DoCheck {
  @Input() title:string = "";
  isLoggedIn:boolean = false;
  username:string = "";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ngDoCheck():void {
    this.isLoggedIn = AppState.instance.isLoggedIn;
    this.username = AppState.instance.username;
  }

  OnClickSignOut(){
    AppState.instance.isLoggedIn = false;
    AppState.instance.username = "";
    AppState.instance.user_type = "";
    AppState.instance.access_token = "";
    AppState.instance.clerk_id = 0;
    AppState.instance.user_id = 0;
    AppState.instance.clerkUser = new Clerk();

    this.router.navigate(['login']);
  }

}
