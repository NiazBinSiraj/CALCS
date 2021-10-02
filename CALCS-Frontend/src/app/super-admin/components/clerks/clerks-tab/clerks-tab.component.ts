import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clerks-tab',
  templateUrl: './clerks-tab.component.html',
  styleUrls: ['./clerks-tab.component.scss']
})
export class ClerksTabComponent implements OnInit {

  clerksInfoIsActive:boolean = true;
  entryNewClerkIsActive:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  OnClickClerkInfo(): void{
    this.clerksInfoIsActive = true;
    this.entryNewClerkIsActive = false;
  }

  OnClickEntryNewClerk(): void{
    this.clerksInfoIsActive = false;
    this.entryNewClerkIsActive = true;
  }

}
