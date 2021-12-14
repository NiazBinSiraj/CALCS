import { SubcriteriaByCriteria } from './../../../models/subcriteriaByCriteria';
import { Criteria } from './../../../models/criteria';
import { Observation } from './../../../models/observation';
import { SoldierServiceService } from './../../../services/soldierService/soldier-service.service';
import { Component, OnInit } from '@angular/core';
import { Soldier } from 'src/app/models/soldier';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';

@Component({
  selector: 'app-soldiers-info',
  templateUrl: './soldiers-info.component.html',
  styleUrls: ['./soldiers-info.component.scss']
})
export class SoldiersInfoComponent implements OnInit {

  observation_checked:boolean[] = [];

  requesting:boolean = false;
  soldiers:Soldier[] = [];
  observations:Observation[] = [];
  criterias:Criteria[] = [];
  subCriterias:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  soldier_observation:Observation[] = [];

  modal_assess:boolean = false;
  modal_observation:boolean = false;
  soldier_index:number = -1;
  criteria_index:number = -1;
  
  constructor(private soldierService:SoldierServiceService, private performanceService:PerformanceServiceService) { }

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
      this.GetAllObservation();
    }).catch((err) => {
      this.requesting = false;
      alert(err.error + " " + err.errorText);
      console.log(err);
    });
  }

  async GetAllObservation()
  {
    this.requesting = true;
    await this.performanceService.GetAllObservations().then((res) =>{
      this.observations = res;

      this.requesting = false;
    }).catch((err) =>{
      window.alert("Error");

      this.requesting = false;
    });
  }

  async GetSoldierObservation()
  {
    this.requesting = true;
    await this.performanceService.GetSoldierObservation(this.soldiers[this.soldier_index].id).then((res) =>{
      this.soldier_observation = res;
      console.log(this.soldier_observation);

      for(let i=0; i<this.observations.length; i++)
      {
        for(let j=0; j<this.soldier_observation.length; j++)
        {
          if(this.soldier_observation[j].id == this.observations[i].id) {this.observation_checked[i] = true; break;}
          else this.observation_checked[i] = false;
        }
      }

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
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  OnClickCriteria(ind:number)
  {
    this.criteria_index = ind;
    this.GetAllSubCriteria();
  }

  OnClickAssess(ind:number)
  {
    this.soldier_index = ind;
    this.modal_assess = true;
    this.modal_observation = false;

    this.GetAllCriteria();
  }

  OnClickObservations(ind:number){

    for(let i=0; i<this.observations.length; i++) this.observation_checked[i] = false;
    
    this.soldier_index = ind;
    this.modal_assess = false;
    this.modal_observation = true;

    this.GetSoldierObservation();
  }

  OnClickClose(ind:number){
    for(let i=0; i<this.observations.length; i++) this.observation_checked[i] = false;
    this.modal_assess = false;
    this.modal_observation = false;
    if(ind == 0) this.GetSoldierObservation();
    else this.GetAllSubCriteria();
  }

  async OnClickSaveObservation(){
    this.requesting = true;
    
    await this.performanceService.CreateSoldierObservation(this.soldiers[this.soldier_index].id, this.soldier_observation).then((res) =>{
      this.requesting = false;
      this.GetSoldierObservation();
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERRORR");
    });
  }

  async OnClickSaveAssess(){
    this.requesting = true;
    await this.performanceService.SetAssesment(this.soldiers[this.soldier_index].id, this.criterias[this.criteria_index].id, this.subCriterias).then((res) =>{
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  OnChangeCheckbox(event:any, obs_ind:number)
  {
    if(event.target.checked)
    {
      this.soldier_observation.push(this.observations[obs_ind]);
    }
    else
    {
      for(let i=0; i<this.soldier_observation.length; i++)
      {
        if(this.soldier_observation[i].id == this.observations[obs_ind].id) this.soldier_observation.splice(i,1);
      }
    }
  }

  OnEditSubCriteriaMark(event:any, ind:number){
    this.subCriterias.sub_criterias[ind].mark = event.target.value;
  }

}
