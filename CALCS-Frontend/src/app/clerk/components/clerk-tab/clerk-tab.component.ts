import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clerk-tab',
  templateUrl: './clerk-tab.component.html',
  styleUrls: ['./clerk-tab.component.scss']
})
export class ClerkTabComponent implements OnInit {

  hounerBoardIsActive:boolean = true;
  soldiersinfoIsActive:boolean = false;
  performanceIsActive:boolean = false;
  punishmentIsActive:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  OnClickHounerBoard()
  {
    this.hounerBoardIsActive = true;
    this.soldiersinfoIsActive = false;
    this.performanceIsActive = false;
    this.punishmentIsActive = false;
  }

  OnClickSoldiersInfo()
  {
    this.hounerBoardIsActive = false;
    this.soldiersinfoIsActive = true;
    this.performanceIsActive = false;
    this.punishmentIsActive = false;
  }

  OnClickPerformance()
  {
    this.hounerBoardIsActive = false;
    this.soldiersinfoIsActive = false;
    this.performanceIsActive = true;
    this.punishmentIsActive = false;
  }

  OnClickPunishment()
  {
    this.hounerBoardIsActive = false;
    this.soldiersinfoIsActive = false;
    this.performanceIsActive = false;
    this.punishmentIsActive = true;
  }

}
