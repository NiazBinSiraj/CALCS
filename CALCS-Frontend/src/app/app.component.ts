import { AppState } from 'src/app-state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CALCS-Frontend';

  constructor(private router: Router){}

  ngOnInit()
  {
    if(AppState.instance.isLoggedIn){
      if(AppState.instance.user_type == "A")this.router.navigate(['superAdmin']);
      if(AppState.instance.user_type == "officer")this.router.navigate(['officer']);
      if(AppState.instance.user_type == "C")this.router.navigate(['clerk']);
    }
    else{
      this.router.navigate(['login']);
    }
  }
}
