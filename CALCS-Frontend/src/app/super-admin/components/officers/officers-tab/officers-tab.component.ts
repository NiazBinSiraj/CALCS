import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officers-tab',
  templateUrl: './officers-tab.component.html',
  styleUrls: ['./officers-tab.component.scss']
})
export class OfficersTabComponent implements OnInit {

  officersInfoIsActive:boolean = true;
  entryNewOfficerIsActive:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  OnClickOfficersInfo()
  {
    this.officersInfoIsActive = true;
    this.entryNewOfficerIsActive = false;
  }

  OnClickEntryNewOfficer()
  {
    this.officersInfoIsActive = false;
    this.entryNewOfficerIsActive = true;
  }

}
