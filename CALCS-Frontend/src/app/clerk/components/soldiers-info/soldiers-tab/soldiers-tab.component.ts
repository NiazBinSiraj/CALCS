import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-soldiers-tab',
  templateUrl: './soldiers-tab.component.html',
  styleUrls: ['./soldiers-tab.component.scss']
})
export class SoldiersTabComponent implements OnInit {

  soldiersIsActive:boolean = true;
  entryNewSoldierIsActive:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  OnClickSoldier()
  {
    this.soldiersIsActive = true;
    this.entryNewSoldierIsActive = false;
  }

  OnClickEntryNewSoldier()
  {
    this.soldiersIsActive = false;
    this.entryNewSoldierIsActive = true;
  }

}
