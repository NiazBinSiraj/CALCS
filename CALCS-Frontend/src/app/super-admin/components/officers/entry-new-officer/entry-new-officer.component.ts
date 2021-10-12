import { Officer } from './../../../../models/officer';
import { Component, OnInit } from '@angular/core';
import { OfficerServiceService } from 'src/app/services/officerService/officer-service.service';

@Component({
  selector: 'app-entry-new-officer',
  templateUrl: './entry-new-officer.component.html',
  styleUrls: ['./entry-new-officer.component.scss']
})
export class EntryNewOfficerComponent implements OnInit {

  requesting:boolean = false;
  
  passwordIsHidden:boolean = true;
  passwordStatus:string = "Show";

  newOfficer:Officer = new Officer();
  
  constructor(private officerService:OfficerServiceService) { }

  ngOnInit(): void {
    this.newOfficer.subunit = "A coy";
  }

  OnClickShowPassword()
  {
    if(this.passwordIsHidden)
    {
      this.passwordIsHidden = false;
      this.passwordStatus = "Hide";
    }

    else
    {
      this.passwordIsHidden = true;
      this.passwordStatus = "Show";
    }
  }

  async OnClickSubmit()
  {
    this.requesting = true;
    let entry = {
      "user" : {
        "username": this.newOfficer.username,
        "password": this.newOfficer.password,
        "email": this.newOfficer.email,
      },
      "name": this.newOfficer.name,
      "ba_no": this.newOfficer.ba_no,
      "rank": this.newOfficer.rank,
      "password": this.newOfficer.password,
      "address": this.newOfficer.address,
      "unit": this.newOfficer.unit,
      "subunit": this.newOfficer.subunit,
      "contact": this.newOfficer.contact,
      "appointment": this.newOfficer.appointment
    };
    await this.officerService.Create(entry).then((res) => {
      this.requesting = false;
      alert("Officer Added Successfully");
      console.log("Officer Added Successfully\n" + res);
    }).catch((err) => {
      this.requesting = false;
      if(err.error.ba_no != null) alert(err.error.ba_no);
      if(err.error.user.username != null) alert(err.error.user.username);
      if(err.error.user.email != null) alert(err.error.user.email);
      else alert(err.status + " " + err.statusText);
      console.log(err);
    });
  }

  OnEditBaNo(event:any){
    this.newOfficer.ba_no = event.target.value;
  }
  OnEditUsername(event:any){
    this.newOfficer.username = event.target.value;
  }
  OnEditName(event:any){
    this.newOfficer.name = event.target.value;
  }
  OnEditRank(event:any){
    this.newOfficer.rank = event.target.value;
  }
  OnEditPassword(event:any){
    this.newOfficer.password = event.target.value;
  }
  OnEditEmail(event:any){
    this.newOfficer.email = event.target.value;
  }
  OnEditUnit(event:any){
    this.newOfficer.unit = event.target.value;
  }
  OnEditSubunit(event:any){
    this.newOfficer.subunit = event.target.value;
  }
  OnEditContact(event:any){
    this.newOfficer.contact = event.target.value;
  }
  OnEditAddress(event:any){
    this.newOfficer.address = event.target.value;
  }
  OnEditAppointment(event:any){
    this.newOfficer.appointment = event.target.value;
  }
}
