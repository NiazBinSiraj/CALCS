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
    this.newclerk.type = "C";
    let entry = {
      "username": this.newclerk.username,
      "name": this.newclerk.name,
      "password": this.newclerk.password,
      "email": this.newclerk.email,
      "type": this.newclerk.type,
      "rank": this.newclerk.rank,
      "address": this.newclerk.address,
      "unit": this.newclerk.unit,
      "subunit": this.newclerk.subunit,
      "contact": this.newclerk.contact
    };
    await this.clerkService.Create(entry).then((res) => {
      console.log(res);
    }).catch(console.error);
    
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
