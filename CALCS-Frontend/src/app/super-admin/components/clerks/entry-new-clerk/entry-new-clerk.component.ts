import { ClerkServiceService } from 'src/app/services/clerkService/clerk-service.service';
import { Component, OnInit } from '@angular/core';
import { Clerk } from 'src/app/models/clerk';

@Component({
  selector: 'app-entry-new-clerk',
  templateUrl: './entry-new-clerk.component.html',
  styleUrls: ['./entry-new-clerk.component.scss']
})
export class EntryNewClerkComponent implements OnInit {

  passwordIsHidden:boolean = true;
  passwordStatus:string = "Show";

  newclerk:Clerk = new Clerk();
  
  constructor(private clerkService: ClerkServiceService) { }

  ngOnInit(): void {
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
    let entry = {
      "user" : {
        "username": this.newclerk.username,
        "password": this.newclerk.password,
        "email": this.newclerk.email,
      },
      "name": this.newclerk.name,
      "personal_no": this.newclerk.personal_no,
      "rank": this.newclerk.rank,
      "password": this.newclerk.password,
      "address": this.newclerk.address,
      "unit": this.newclerk.unit,
      "subunit": this.newclerk.subunit,
      "contact": this.newclerk.contact
    };
    await this.clerkService.Create(entry).then((res) => {
      console.log("Clerk Added Successfully\n" + res);
    }).catch(console.error);
    
  }

  OnEditPersonalNo(event:any){
    this.newclerk.personal_no = event.target.value;
  }
  OnEditUsername(event:any){
    this.newclerk.username = event.target.value;
  }
  OnEditName(event:any){
    this.newclerk.name = event.target.value;
  }
  OnEditRank(event:any){
    this.newclerk.rank = event.target.value;
  }
  OnEditPassword(event:any){
    this.newclerk.password = event.target.value;
  }
  OnEditEmail(event:any){
    this.newclerk.email = event.target.value;
  }
  OnEditUnit(event:any){
    this.newclerk.unit = event.target.value;
  }
  OnEditSubunit(event:any){
    this.newclerk.subunit = event.target.value;
  }
  OnEditContact(event:any){
    this.newclerk.contact = event.target.value;
  }
  OnEditAddress(event:any){
    this.newclerk.address = event.target.value;
  }
}
