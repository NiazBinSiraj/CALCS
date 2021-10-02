import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-admin-tab',
  templateUrl: './super-admin-tab.component.html',
  styleUrls: ['./super-admin-tab.component.scss']
})
export class SuperAdminTabComponent implements OnInit {

  clerkIsActive:boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
