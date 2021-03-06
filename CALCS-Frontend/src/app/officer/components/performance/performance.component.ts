import { SubcriteriaByCriteria } from './../../../models/subcriteriaByCriteria';
import { Subcriteria } from './../../../models/subcriteria';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';
import { Criteria } from './../../../models/criteria';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app-state';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  isRequesting:boolean = false;
  
  criteria_id:number = 0;
  criterias:Criteria[] = [];
  subcriterias:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  newSubCriteriaWithCriteria:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  newSubcriteria:Subcriteria = new Subcriteria;
  newCriteriaMark:number = 0;
  
  constructor(private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.criteria_id = 1;
    this.GetAllCriteria();
  }

  async GetAllCriteria()
  {
    this.isRequesting = true;
    await this.performanceService.GetAllCriteria().then(async (res) =>{
      this.isRequesting = true;
      if(res.length == 0)
      {
        await this.performanceService.GenerateCriteria().then((res2) =>{
          this.criterias = res2;
          console.log(this.criterias);
          this.isRequesting = false;
        }).catch((err) =>{
          console.log(err);
          window.alert("ERROR");
          this.isRequesting = false;
        })
      }

      else
      {
        this.criterias = res;
        console.log(this.criterias);
        this.isRequesting = false;

        this.GetAllSubcriteria();
      }
    }).catch((err) =>{
      console.log(err);
      window.alert("ERROR");

      this.isRequesting = false;
    });
  }

  async CreateSubcriteria()
  {
    let body = {
      criteria: this.criteria_id,
      name: this.newSubcriteria.name,
      subunit: AppState.instance.officer.subunit
    }
    this.isRequesting = true;
    await this.performanceService.CreateSubCriteria(body).then((res) =>{
      this.isRequesting = false;
      this.newSubcriteria.name = "";
      this.GetAllSubcriteria();
    }).catch((err) =>{
      console.log(err);
      this.isRequesting = false;
      window.alert("ERROR");
    });
  }

  async GetAllSubcriteria()
  {
    this.isRequesting = true;
    let subunit:string = "";
    subunit = AppState.instance.officer.subunit;
    await this.performanceService.GetAllSubCriteria(this.criteria_id, subunit).then((res) =>{
      this.subcriterias = res;
      this.newSubCriteriaWithCriteria = res;
      this.newCriteriaMark = this.newSubCriteriaWithCriteria.mark;
      console.log(res);
      this.isRequesting = false;
    }).catch((err) =>{
      console.log(err);
      this.isRequesting = false;
      window.alert("ERROR");
    });
  }

  OnEditSubcriteria(event:any)
  {
    this.newSubcriteria.name = event.target.value;
  }
  OnClickCriteria(id:any)
  {
    this.criteria_id = this.criterias[id].id;
    this.GetAllSubcriteria();
  }
  OnClickAdd()
  {
    this.CreateSubcriteria();
  }

  OnClickDelete(id:any)
  {
    this.isRequesting = true;
    this.performanceService.DeleteSubCriteria(this.subcriterias.sub_criterias[id].id).then((res) =>{
      this.isRequesting = false;
      this.GetAllSubcriteria();
    }).catch((err) =>{
      console.log(err);
      this.isRequesting = false;
      window.alert("ERROR");
    });
  }

  OnEditTotalMark(event:any)
  {
    this.newSubCriteriaWithCriteria.mark = parseInt(event.target.value);
  }
  OnEditSubCriteriaMark(event:any, id:any)
  {
    this.newSubCriteriaWithCriteria.sub_criterias[id].mark = parseInt(event.target.value);
  }

  OnClickSave()
  {
    let sum:number = 0;

    for(let i=0; i<this.subcriterias.sub_criterias.length; i++)
    {
      sum=sum+this.newSubCriteriaWithCriteria.sub_criterias[i].mark;
      console.log(this.newSubCriteriaWithCriteria.sub_criterias[i].mark);
    }

    if(this.newSubCriteriaWithCriteria.mark != sum)
    {
      window.alert("Sum of all subcriteria marks must be equal to the criteria mark.");
      return;
    }

    else
    {
      let body = Object.assign(this.newSubCriteriaWithCriteria);
      for(let i=0; i<body.sub_criterias.length; i++)
      {
        delete body.sub_criterias[i].name;
      }
      
      console.log(body);
      
      
      this.isRequesting = true;
      this.performanceService.UpdateSubCriteriaMarks(this.criteria_id, body).then((res) =>{
        this.isRequesting = false;
        this.newSubCriteriaWithCriteria = new SubcriteriaByCriteria;
        this.GetAllSubcriteria();
      }).catch((err) =>{
        console.log(err);
        this.isRequesting=false;
        window.alert("ERROR");
      });
    }

  }

}
