import { AppState } from './../../../../app-state';
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

  info_body = {
    "soldier": -1,
    "medical_category": "",
    "IPFT_first_biannual": 0,
    "IPFT_second_biannual": 0,
    "RET": 0
  };

  info_id:number = -1;
  
  report = {
    "evaluation_date_from": "",
    "evaluation_date_to": "",
    "personal_no": 0,
    "rank": "",
    "name": "",
    "appointment": "",
    "date_of_enrollment": "",
    "last_promotion_date": "",
    "unit": "",
    "medical_category": "",
    "IPFT_first_biannual": 0,
    "IPFT_second_biannual": 0,
    "RET": 0,
    "DIV_order_letter_no_1": "",
    "DIV_order_letter_no_2": "",
    "DIV_order_letter_no_3": "",
    "criteria_name": {},
    "fit_for_next_promotion": "",
    "fit_for_next_promotion_yes_text": "",
    "fit_for_next_promotion_no_text": "",
    "fit_for_being_instructor": "",
    "fit_for_being_instructor_yes_text": "",
    "fit_for_being_instructor_no_text": "",
    "fit_for_foreign_mission": "",
    "fit_for_foreign_mission_yes_text": "",
    "fit_for_foreign_mission_no_text": "",
    "recommendation_for_next_appt": "",
    "special_quality": "",
    "remarks_by_initiating_officer": "",
    "grade": ""
  };

  report_name:string = "";
  report_total_marks = 0;
  
  observation_checked:boolean[] = [];

  requesting:boolean = false;
  soldiers:Soldier[] = [];
  observations:Observation[] = [];
  criterias:Criteria[] = [];
  subCriterias:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  soldier_observation:Observation[] = [];

  modal_assess:boolean = false;
  modal_observation:boolean = false;
  modal_report:boolean = false;
  modal_report_download:boolean = false;
  soldier_index:number = -1;
  criteria_index:number = -1;
  total:number = 0;

  download_url = "";
  report_status:string = "";
  pdf_found:boolean = false;
  clickedInfo:boolean = false;
  
  constructor(private soldierService:SoldierServiceService, private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.GetAllSoldiers();
  }

  async GetAllSoldiers()
  {
    this.requesting = true;
    await this.soldierService.GetAll().then((res) => {
      
      this.soldiers = res;
      this.soldiers = this.soldiers.filter(function(value, index, arr){return value.subunit == AppState.instance.officer.subunit});
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
      this.CalcTotal();
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  OnClickCriteria(ind:number)
  {
    this.clickedInfo = false;
    this.criteria_index = ind;
    this.GetAllSubCriteria();

    this.info_body.IPFT_first_biannual = 0;
    this.info_body.IPFT_second_biannual = 0;
    this.info_body.RET = 0;
    this.info_body.medical_category = "";
    //this.info_body.soldier = -1;
    this.info_id = -1;
  }

  async OnClickInfo()
  {
    this.clickedInfo = true;
    this.requesting = true;
    await this.soldierService.GetByIDExtra(this.soldiers[this.soldier_index].id).then((res) =>{
      console.log(res);
      this.info_id = res.id;
      this.info_body = res;
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      console.log(this.info_body);
    });
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
    this.clickedInfo = false;
    for(let i=0; i<this.observations.length; i++) this.observation_checked[i] = false;
    this.modal_assess = false;
    this.modal_observation = false;
    this.modal_report = false;
    this.modal_report_download = false;
    if(ind == 0) this.GetSoldierObservation();
    else if(ind == 1) this.GetAllSubCriteria();

    this.info_body.IPFT_first_biannual = 0;
    this.info_body.IPFT_second_biannual = 0;
    this.info_body.RET = 0;
    this.info_body.medical_category = "";
    this.info_body.soldier = -1;
    this.info_id = -1;
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
    
    if(this.clickedInfo)
    {
      this.clickedInfo = false;
      this.info_body.soldier = this.soldiers[this.soldier_index].id;
      
      if(this.info_id != -1)
      {
        this.requesting = true;
        this.soldierService.UpdateExtra(this.info_id, this.info_body).then((res) =>{
          alert("Updated Successfully");
          this.requesting = false;
          return;
        }).catch((err) =>{
          this.requesting = false;
          console.log(err);
          alert("ERROR");
          return;
        });
        return;
      }
      
      
      
      if(this.info_body.medical_category == "")
      {
        alert("Medical Category can not be blank");
        return;
      }

      this.soldierService.CreateExtra(this.info_body).then((res) =>{
        this.requesting = false;
        return;
      }).catch((err) =>{
        console.log(err);
        alert("ERROR");
        this.requesting = false;
        return;
      });
    }
    
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
    this.subCriterias.sub_criterias[ind].mark = parseInt(event.target.value);
    this.CalcTotal();
  }

  CalcTotal(){
    this.total = 0;
    for(let i=0; i<this.subCriterias.sub_criterias.length; i++)
    {
      this.total += this.subCriterias.sub_criterias[i].mark;
    }
  }

  //PDF Report
  OnClickGeneratePDF(ind:number)
  {
    this.soldier_index = ind;
    this.requesting = true;
    this.performanceService.GetDefaultData(this.soldiers[this.soldier_index].id).then(async (res) =>{
      this.report = res;
      this.report_total_marks = res.criteria.total_marks;
      this.report_name = this.report.personal_no.toString() + " " + this.report.rank + " " + this.report.name;

      await this.soldierService.GetByIDExtra(this.soldiers[this.soldier_index].id).then((res1) =>{
        this.info_body = res1;
        this.report.medical_category = res1.medical_category;
        this.report.IPFT_first_biannual = res1.IPFT_first_biannual;
        this.report.IPFT_second_biannual = res1.IPFT_second_biannual;
        this.report.RET = res1.RET;
        console.log(this.report);
        this.requesting = false;
      }).catch((err) =>{
        this.requesting = false;
        console.log(err);
      });
      this.requesting = false;
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    });

    this.modal_report = true;
  }

  OnEditEvaluationFromDate(event:any){
    this.report.evaluation_date_from = event.target.value;
  }
  OnEditEvaluationToDate(event:any){
    this.report.evaluation_date_to = event.target.value;
  }
  OnEditMedicalCategory(event:any){
    this.info_body.medical_category = event.target.value;
  }
  OnSelectFirstBiannualPass(event:any){
    this.info_body.IPFT_first_biannual =1;
  }

  OnSelectFirstBiannualFail(event:any){
    this.info_body.IPFT_first_biannual =0;
  }

  OnEditOrderLetter1(event:any){
    this.report.DIV_order_letter_no_1 = event.target.value;
  }
  OnSelectSecondBiannualPass(event:any){
    this.info_body.IPFT_second_biannual =1;
  }

  OnSelectSecondBiannualFail(event:any){
    this.info_body.IPFT_second_biannual =0;
  }

  OnEditOrderLetter2(event:any){
    this.report.DIV_order_letter_no_2 = event.target.value;
  }

  OnSelectRetPass(event:any){
    this.info_body.RET =1;
  }

  OnSelectRetFail(event:any){
    this.info_body.RET =0;
  }

  OnEditOrderLetter3(event:any){
    this.report.DIV_order_letter_no_3 = event.target.value;
  }

  OnSelectFitForNextPromotionYes(event:any){
    this.report.fit_for_next_promotion = "1";
  }
  OnSelectFitForNextPromotionNo(event:any){
    this.report.fit_for_next_promotion = "0";
  }

  OnSelectFitForBeingInstructorYes(event:any){
    this.report.fit_for_being_instructor = "1";
  }
  OnSelectFitForBeingInstructorNo(event:any){
    this.report.fit_for_being_instructor = "0";
  }

  OnSelectFitForForeignMissionYes(event:any){
    this.report.fit_for_foreign_mission = "1";
  }
  OnSelectFitForForeignMissionNo(event:any){
    this.report.fit_for_foreign_mission = "0";
  }

  OnEditRecomendationForNextAppt(event:any){
    this.report.recommendation_for_next_appt = event.target.value;
  }
  OnEditSpecialQuality(event:any){
    this.report.special_quality = event.target.value;
  }
  OnEditRemarks(event:any){
    this.report.remarks_by_initiating_officer = event.target.value;
  }

  OnSelectGradeOutStanding(event:any){
    this.report.grade = "0";
  }
  OnSelectGradeAboveAverage(event:any){
    this.report.grade = "1";
  }
  OnSelectGradeHighAverage(event:any){
    this.report.grade = "2";
  }
  OnSelectGradeAverage(event:any){
    this.report.grade = "3";
  }
  OnSelectGradeBelowAverage(event:any){
    this.report.grade = "4";
  }

  async OnClickGenerateReport()
  {
    
    if(this.report.evaluation_date_from == "")
    {
      window.alert("Evaluation Date From can not be empty");
      return;
    }
    else if(this.report.evaluation_date_to == "")
    {
      window.alert("Evaluation Date To can not be empty");
      return;
    }
    else if(this.report.medical_category == "")
    {
      window.alert("Medical Category To can not be empty");
      return;
    }
    else if(this.report.DIV_order_letter_no_1 == "")
    {
      window.alert("DIV_order_letter_no1 can not be empty");
      return;
    }
    else if(this.report.DIV_order_letter_no_2 == "")
    {
      window.alert("DIV_order_letter_no2 can not be empty");
      return;
    }
    else if(this.report.DIV_order_letter_no_3 == "")
    {
      window.alert("DIV_order_letter_no3 can not be empty");
      return;
    }

    if(this.report.IPFT_first_biannual) this.report.IPFT_first_biannual = 1;
    else this.report.IPFT_first_biannual = 0;

    if(this.report.IPFT_second_biannual) this.report.IPFT_second_biannual = 1;
    else this.report.IPFT_second_biannual = 0;

    if(this.report.RET) this.report.RET = 1;
    else this.report.RET = 0;

    this.requesting = true;
    console.log(this.report);
    await this.performanceService.SubmitReport(this.soldiers[this.soldier_index].id, this.report).then((res) =>{
      this.requesting = false;
      window.alert("Data Submitted Successfully");
      this.OnClickClose(2);
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    });

  }

  OnClickDownloadReport(ind:number){
    this.requesting = true;
    this.soldier_index = ind;
    this.download_url = AppState.instance.backendURL+"/core/report/download/officer/"+AppState.instance.related_id.toString()+"/soldier/"+this.soldiers[this.soldier_index].id.toString();
    this.performanceService.CheckReport(this.soldiers[this.soldier_index].id).then((res) =>{
      if(res.status == true){
        this.report_status = "Your PDF File is ready.";
        this.pdf_found = true;
      }
      else{
        this.report_status = "PDF Not Found";
        this.pdf_found = false;
      }
      this.requesting = false;
      this.modal_report_download = true;
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    });
  }

}
