import { AppState } from './../../../../app-state';
import { Component, OnInit } from '@angular/core';
import { SubcriteriaByCriteria } from './../../../models/subcriteriaByCriteria';
import { Subcriteria } from './../../../models/subcriteria';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';
import { Criteria } from './../../../models/criteria';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  isRequesting: boolean = false;

  criteria_id: number = 0;
  criterias: Criteria[] = [];
  subcriterias: SubcriteriaByCriteria = new SubcriteriaByCriteria;
  newSubCriteriaWithCriteria: SubcriteriaByCriteria = new SubcriteriaByCriteria;
  newSubcriteria: Subcriteria = new Subcriteria;
  newCriteriaMark: number = 0;

  constructor(private performanceService: PerformanceServiceService) { }

  ngOnInit(): void {
    this.criteria_id = 1;
    this.GetAllCriteria();
  }

  async GetAllCriteria() {
    this.isRequesting = true;
    await this.performanceService.GetAllCriteria().then(async (res) => {
      this.isRequesting = true;
      if (res.length == 0) {
        await this.performanceService.GenerateCriteria().then((res2) => {
          this.criterias = res2;
          console.log(this.criterias);
          this.isRequesting = false;
        }).catch((err) => {
          console.log(err);
          window.alert("ERROR");
          this.isRequesting = false;
        })
      }

      else {
        this.criterias = res;
        console.log(this.criterias);
        this.isRequesting = false;

        this.GetAllSubcriteria();
      }
    }).catch((err) => {
      console.log(err);
      window.alert("ERROR");

      this.isRequesting = false;
    });
  }

  async CreateSubcriteria() {
    let body = {
      criteria: this.criteria_id,
      name: this.newSubcriteria.name
    }
    this.isRequesting = true;
    await this.performanceService.CreateSubCriteria(body).then((res) => {
      this.isRequesting = false;
      this.newSubcriteria.name = "";
      this.GetAllSubcriteria();
    }).catch((err) => {
      console.log(err);
      this.isRequesting = false;
      window.alert("ERROR");
    });
  }

  async GetAllSubcriteria() {
    this.isRequesting = true;
    let subunit:string = "";
    subunit = AppState.instance.clerk.subunit;
    await this.performanceService.GetAllSubCriteria(this.criteria_id, subunit).then((res) => {
      this.subcriterias = res;
      this.newSubCriteriaWithCriteria = res;
      this.newCriteriaMark = this.newSubCriteriaWithCriteria.mark;
      console.log(res);
      this.isRequesting = false;
    }).catch((err) => {
      console.log(err);
      this.isRequesting = false;
      window.alert("ERROR");
    });
  }

  OnClickCriteria(id: any) {
    this.criteria_id = this.criterias[id].id;
    this.GetAllSubcriteria();
  }

}
