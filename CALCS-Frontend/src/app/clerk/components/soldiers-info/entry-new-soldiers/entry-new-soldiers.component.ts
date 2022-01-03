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
    this.newSoldier.subunit = "A coy";
    this.newSoldier.previous_subunit = "None";
  }

  async OnClickSubmit()
  {
    this.requesting = true;
    let entry = {
      "personal_no": this.newSoldier.personal_no,
      "name": this.newSoldier.name,
      "rank": this.newSoldier.rank,
      "unit": this.newSoldier.unit,
      "subunit": this.newSoldier.subunit,
      "previous_subunit": this.newSoldier.previous_subunit,
      "appointment": this.newSoldier.appointment,
      "contact": this.newSoldier.contact,
      "unit_join_date": this.newSoldier.unit_join_date,
      "last_promotion_date": this.newSoldier.last_promotion_date,
      "date_of_enrollment": this.newSoldier.date_of_enrollment,
      "due_date_of_next_rank": this.newSoldier.due_date_of_next_rank
    };
    await this.soldierService.Create(entry).then((res) => {
      this.newSoldier = new Soldier();
      this.requesting = false;
      alert("Soldier Added Successfully");
      console.log("Soldier Added Successfully\n" + res);
      this.newSoldier = new Soldier();
      this.newSoldier.subunit = "A coy";
      this.newSoldier.previous_subunit = "None";
    }).catch((err) => {
      this.requesting = false;
      if(err.error.personal_no != null) alert(err.error.personal_no);
      else alert(err.status + " " + err.statusText);
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
  OnEditUnit(event:any){
    this.newSoldier.unit = event.target.value;
  }
  OnEditSubunit(event:any){
    this.newSoldier.subunit = event.target.value;
  }
  OnEditPreviousSubunit(event:any){
    this.newSoldier.previous_subunit = event.target.value;
  }
  OnEditAppointment(event:any){
    this.newSoldier.appointment = event.target.value;
  }
  OnEditContact(event:any){
    this.newSoldier.contact = event.target.value;
  }
  OnEditJoinDateInUnit(event:any){
    this.newSoldier.unit_join_date = event.target.value;
  }
  OnEditDateOfLastPromotion(event:any){
    this.newSoldier.last_promotion_date = event.target.value;
  }
  OnEditDateOfEnrollment(event:any){
    this.newSoldier.date_of_enrollment = event.target.value;
  }
  OnEditDueDateOfNextRank(event:any){
    this.newSoldier.due_date_of_next_rank = event.target.value;
  }

  StringToDate(dateString:string)
  {
    console.log(dateString);
    return new Date(dateString);
  }
}