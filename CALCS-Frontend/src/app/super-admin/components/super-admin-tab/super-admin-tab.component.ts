import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-admin-tab',
  templateUrl: './super-admin-tab.component.html',
  styleUrls: ['./super-admin-tab.component.scss']
})
export class SuperAdminTabComponent implements OnInit {

  clerkIsActive:boolean = true;
  officerIsActive:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  OnClickClerks()
  {
    this.clerkIsActive = true;
    this.officerIsActive = false;
  }

  OnClickOfficers()
  {
    this.clerkIsActive = false;
    this.officerIsActive = true;
  }

}
