import { Component, OnInit } from '@angular/core';
import { Clerk } from 'src/app/models/clerk';
import { ClerkServiceService } from 'src/app/services/clerkService/clerk-service.service';

@Component({
  selector: 'app-honour-board',
  templateUrl: './honour-board.component.html',
  styleUrls: ['./honour-board.component.scss']
})
export class HonourBoardComponent implements OnInit {

  requesting:boolean = false;
  clerks:Clerk[] = [];
  
  constructor(private clerkService: ClerkServiceService) { }

  ngOnInit(): void {
    this.GetAllClerks();
  }

  async GetAllClerks()
  {
    this.requesting = true;
    await this.clerkService.GetAll().then((res) => {
      
      for(let i=0; i<res.length; i++)
      {
        let clerk:Clerk = new Clerk();
        clerk.personal_no = res[i].personal_no;
        clerk.username = res[i].user.username;
        clerk.name = res[i].name;
        clerk.email = res[i].user.email;
        clerk.password = res[i].password;
        clerk.unit = res[i].unit;
        clerk.subunit = res[i].subunit;
        clerk.rank = res[i].rank;
        clerk.contact = res[i].contact;
        clerk.address = res[i].address;
        clerk.profile_pic = res[i].profile_clerk;
        clerk.starting_date = res[i].starting_date;
        clerk.ending_date = res[i].ending_date;

        this.clerks.push(clerk);
      }

      this.requesting = false;
    }).catch((err) => {
      this.requesting = false;
      alert(err.error + " " + err.errorText);
      console.log(err);
    });
  }

}
