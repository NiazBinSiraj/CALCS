import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';
import { Observation } from './../../../../models/observation';
import { SoldierServiceService } from './../../../../services/soldierService/soldier-service.service';
import { Soldier } from './../../../../models/soldier';
import { Component, HostListener, OnInit } from '@angular/core';
import { Criteria } from 'src/app/models/criteria';
import { SubcriteriaByCriteria } from 'src/app/models/subcriteriaByCriteria';

@Component({
  selector: 'app-view-soldiers',
  templateUrl: './view-soldiers.component.html',
  styleUrls: ['./view-soldiers.component.scss']
})
export class ViewSoldiersComponent implements OnInit {

  modal_observation:boolean = false;
  modal_assess:boolean = false;
  observations:Observation[] = [];
  soldier_index:number = -1;
  criteria_index:number = -1;
  total:number = 0;

  criterias:Criteria[] = [];
  subCriterias:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  
  requesting:boolean = false;
  soldiers:Soldier[] = [];
  constructor(private SoldierService:SoldierServiceService, private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.GetAllSoldiers();
  }

  async GetAllSoldiers()
  {
    this.requesting = true;
    await this.SoldierService.GetAll().then((res) => {
      
      for(let i=0; i<res.length; i++)
      {
        let soldier:Soldier = new Soldier();
        soldier.id = res[i].id;
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

  async GetSoldierObservation()
  {
    this.requesting = true;
    await this.performanceService.GetSoldierObservation(this.soldiers[this.soldier_index].id).then((res) =>{
      this.observations = res;

      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  async GetAllCriteria(){
    this.requesting = true;
    this.performanceService.GetAllCriteria().then((res) =>{
      this.criterias = res;
      this.requesting = false;
      if(this.criterias.length != 0)
      {
        this.criteria_index = 0;
        this.GetAllSubCriteria();
      }
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  async GetAllSubCriteria(){
    this.requesting = true;
    this.performanceService.GetAssesment(this.soldiers[this.soldier_index].id, this.criterias[this.criteria_index].id).then((res) =>{
      this.subCriterias = res;
      this.CalcTotal();
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }


  OnClickObservation(ind:number){
    this.soldier_index = ind;
    this.modal_observation = true;

    this.GetSoldierObservation();
  }

  OnClickAssess(ind:number)
  {
    this.soldier_index = ind;
    this.modal_assess = true;
    this.modal_observation = false;

    this.GetAllCriteria();
  }

  OnClickClose(){
    this.modal_observation = false;
    this.modal_assess = false;
  }

  OnClickCriteria(ind:number)
  {
    this.criteria_index = ind;
    this.GetAllSubCriteria();
  }

  CalcTotal(){
    this.total = 0;
    for(let i=0; i<this.subCriterias.sub_criterias.length; i++)
    {
      this.total += this.subCriterias.sub_criterias[i].mark;
    }
  }
}
