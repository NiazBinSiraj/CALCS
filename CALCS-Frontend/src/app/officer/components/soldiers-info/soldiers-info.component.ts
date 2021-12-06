import { SoldierServiceService } from './../../../services/soldierService/soldier-service.service';
import { Component, OnInit } from '@angular/core';
import { Soldier } from 'src/app/models/soldier';

@Component({
  selector: 'app-soldiers-info',
  templateUrl: './soldiers-info.component.html',
  styleUrls: ['./soldiers-info.component.scss']
})
export class SoldiersInfoComponent implements OnInit {

  requesting:boolean = false;
  soldiers:Soldier[] = [];
  
  constructor(private soldierService:SoldierServiceService) { }

  ngOnInit(): void {
    this.GetAllSoldiers();
  }

  async GetAllSoldiers()
  {
    this.requesting = true;
    await this.soldierService.GetAll().then((res) => {
      
      for(let i=0; i<res.length; i++)
      {
        let soldier:Soldier = new Soldier();
        soldier.personal_no = res[i].personal_no;
        soldier.name = res[i].name;
        soldier.rank = res[i].rank;
        soldier.address = res[i].address;
        soldier.unit = res[i].unit;
        soldier.subunit = res[i].subunit;
        soldier.contact = res[i].contact;
        soldier.mission = res[i].mission;
        soldier.join_date = res[i].join_date;
        soldier.commision_date = res[i].commision_date;
        soldier.appointment = res[i].appointment;
        soldier.previous_company = res[i].previous_company;

        this.soldiers.push(soldier);
      }
      this.requesting = false;
    }).catch((err) => {
      this.requesting = false;
      alert(err.error + " " + err.errorText);
      console.log(err);
    });
  }

}
