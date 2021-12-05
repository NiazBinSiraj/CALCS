import { SubcriteriaByCriteria } from './../../../models/subcriteriaByCriteria';
import { Subcriteria } from './../../../models/subcriteria';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';
import { Criteria } from './../../../models/criteria';
import { Component, OnInit } from '@angular/core';

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
      name: this.newSubcriteria.name
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
    await this.performanceService.GetAllSubCriteria(this.criteria_id).then((res) =>{
      this.subcriterias = res;
      this.newSubCriteriaWithCriteria = res;
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
    this.newSubCriteriaWithCriteria.mark = event.target.value;
  }
  OnEditSubCriteriaMark(event:any, id:any)
  {
    this.newSubCriteriaWithCriteria.sub_criterias[id].mark = event.target.value;
  }

  OnClickSave()
  {
    let sum:number  = 0;

    for(let i=0; i<this.subcriterias.sub_criterias.length; i++)
    {
      sum+=this.newSubCriteriaWithCriteria.sub_criterias[i].mark;
    }

    if(this.newSubCriteriaWithCriteria.mark != sum)
    {
      window.alert("Sum of all subcriteria marks must be equal to the criteria mark.");
      return;
    }

    else
    {
      this.isRequesting = true;
      this.performanceService.UpdateSubCriteriaMarks(this.criteria_id, this.newSubCriteriaWithCriteria).then((res) =>{
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
