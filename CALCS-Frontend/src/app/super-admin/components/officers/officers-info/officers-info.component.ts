import { OfficerServiceService } from './../../../../services/officerService/officer-service.service';
import { Officer } from './../../../../models/officer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officers-info',
  templateUrl: './officers-info.component.html',
  styleUrls: ['./officers-info.component.scss']
})
export class OfficersInfoComponent implements OnInit {

  requesting:boolean = false;
  
  officers:Officer[] = [];

  constructor(private officerService:OfficerServiceService) { }

  ngOnInit(): void {
    this.GetAllOfficers();
  }

  async GetAllOfficers()
  {
    this.requesting = true;
    await this.officerService.GetAll().then((res) => {
      
      for(let i=0; i<res.length; i++)
      {
        let officer:Officer = new Officer();
        officer.ba_no = res[i].ba_no;
        officer.username = res[i].user.username;
        officer.name = res[i].name;
        officer.email = res[i].user.email;
        officer.password = res[i].password;
        officer.unit = res[i].unit;
        officer.subunit = res[i].subunit;
        officer.rank = res[i].rank;
        officer.contact = res[i].contact;
        officer.address = res[i].address;
        officer.profile_pic = res[i].profile_clerk;
        officer.starting_date = res[i].starting_date;
        officer.ending_date = res[i].ending_date;
        officer.appointment = res[i].appointment;

        this.officers.push(officer);
      }
      this.requesting = false;
    }).catch((err) => {
      this.requesting = false;
      alert(err.error + " " + err.errorText);
      console.log(err);
    });
  }

}
