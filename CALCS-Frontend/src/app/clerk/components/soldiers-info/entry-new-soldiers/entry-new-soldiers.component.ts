import { SoldierServiceService } from './../../../../services/soldierService/soldier-service.service';
import { Soldier } from './../../../../models/soldier';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-new-soldiers',
  templateUrl: './entry-new-soldiers.component.html',
  styleUrls: ['./entry-new-soldiers.component.scss']
})
export class EntryNewSoldiersComponent implements OnInit {

  requesting:boolean = false;
  newSoldier:Soldier = new Soldier();
  
  constructor(private soldierService:SoldierServiceService) { }

  ngOnInit(): void {
  }

  async OnClickSubmit()
  {
    this.requesting = true;
    let entry = {
      "personal_no": this.newSoldier.personal_no,
      "name": this.newSoldier.name,
      "rank": this.newSoldier.rank,
      "address": this.newSoldier.address,
      "unit": this.newSoldier.unit,
      "subunit": this.newSoldier.subunit,
      "appointment": this.newSoldier.appointment,
      "join_date": this.newSoldier.join_date,
      "commision_date": this.newSoldier.commision_date,
      "contact": this.newSoldier.contact,
      "previous_company": this.newSoldier.previous_company,
      "mission": this.newSoldier.mission,
    };
    await this.soldierService.Create(entry).then((res) => {
      this.requesting = false;
      alert("Soldier Added Successfully");
      console.log("Soldier Added Successfully\n" + res);
    }).catch((err) => {
      this.requesting = false;
      alert(err.status + " " + err.statusText);
      console.log(err);
    });
  }

  OnEditPersonalNo(event:any){
    this.newSoldier.personal_no = event.target.value;
  }
  OnEditName(event:any){
    this.newSoldier.name = event.target.value;
  }
  OnEditRank(event:any){
    this.newSoldier.rank = event.target.value;
  }
  OnEditAddress(event:any){
    this.newSoldier.address = event.target.value;
  }
  OnEditUnit(event:any){
    this.newSoldier.unit = event.target.value;
  }
  OnEditSubunit(event:any){
    this.newSoldier.subunit = event.target.value;
  }
  OnEditAppointment(event:any){
    this.newSoldier.appointment = event.target.value;
  }
  OnEditJoinDate(event:any){
    this.newSoldier.join_date = event.target.value;
  }
  OnEditCommisionDate(event:any){
    this.newSoldier.commision_date = event.target.value;
  }
  OnEditContact(event:any){
    this.newSoldier.contact = event.target.value;
  }
  OnEditPreviousCompany(event:any){
    this.newSoldier.previous_company = event.target.value;
  }
  OnEditMission(event:any){
    this.newSoldier.mission = event.target.value;
  }
}