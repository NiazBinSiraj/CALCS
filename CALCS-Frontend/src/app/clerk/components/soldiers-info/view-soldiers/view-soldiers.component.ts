import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';
import { Observation } from './../../../../models/observation';
import { SoldierServiceService } from './../../../../services/soldierService/soldier-service.service';
import { Soldier } from './../../../../models/soldier';
import { Component, HostListener, OnInit } from '@angular/core';
import { Criteria } from 'src/app/models/criteria';
import { SubcriteriaByCriteria } from 'src/app/models/subcriteriaByCriteria';
import { AppState } from 'src/app-state';

@Component({
  selector: 'app-view-soldiers',
  templateUrl: './view-soldiers.component.html',
  styleUrls: ['./view-soldiers.component.scss']
})
export class ViewSoldiersComponent implements OnInit {

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
    "IPFT_first_biannual": "",
    "IPFT_second_biannual": "",
    "RET": "",
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
  
  modal_observation:boolean = false;
  modal_assess:boolean = false;
  modal_edit_info:boolean = false;
  modal_transfer:boolean = false;
  modal_report:boolean = false;

  observations:Observation[] = [];
  soldier_index:number = -1;
  criteria_index:number = -1;
  total:number = 0;

  criterias:Criteria[] = [];
  subCriterias:SubcriteriaByCriteria = new SubcriteriaByCriteria;
  
  requesting:boolean = false;
  soldiers:Soldier[] = [];
  newSoldier:Soldier = new Soldier;
  constructor(private SoldierService:SoldierServiceService, private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.GetAllSoldiers();
  }

  async GetAllSoldiers()
  {
    this.requesting = true;
    this.soldiers = [];
    await this.SoldierService.GetAll().then((res) => {
      this.soldiers = res;
      this.soldiers = this.soldiers.filter(function(value, index, arr){return value.subunit == AppState.instance.clerk.subunit});
      //console.log(this.soldiers);
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
    this.modal_assess = false;
    this.modal_edit_info = false;
    this.modal_transfer = false;

    this.GetSoldierObservation();
  }

  OnClickAssess(ind:number)
  {
    this.soldier_index = ind;
    this.modal_assess = true;
    this.modal_observation = false;
    this.modal_edit_info = false;
    this.modal_transfer = false;

    this.GetAllCriteria();
  }

  OnClickEditInfo(ind:number){
    this.soldier_index = ind;
    Object.assign(this.newSoldier, this.soldiers[ind]);
    this.modal_assess = false;
    this.modal_observation = false;
    this.modal_transfer = false;
    this.modal_edit_info = true;
  }

  OnClickClose(){
    this.modal_observation = false;
    this.modal_assess = false;
    this.modal_edit_info = false;
    this.modal_transfer = false;
    this.modal_report = false;
  }

  OnClickCriteria(ind:number)
  {
    this.criteria_index = ind;
    this.GetAllSubCriteria();
  }

  OnClickDelete(ind:number)
  {
    this.requesting = true;
    this.SoldierService.Delete(this.soldiers[ind].id).then((res) =>{
      this.requesting = false;
      window.alert("Soldier Deleted");
      this.GetAllSoldiers();
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      window.alert("ERROR");
    });
  }

  OnClickTransfer(ind:number){
    this.soldier_index = ind;
    Object.assign(this.newSoldier, this.soldiers[ind]);
    this.newSoldier.previous_subunit = this.newSoldier.subunit;

    this.modal_observation = false;
    this.modal_assess = false;
    this.modal_edit_info = false;
    this.modal_transfer = true;
  }

  CalcTotal(){
    this.total = 0;
    for(let i=0; i<this.subCriterias.sub_criterias.length; i++)
    {
      this.total += this.subCriterias.sub_criterias[i].mark;
    }
  }

  //Edit SOldier Info
  OnEditPersonalNo(event:any){
    this.newSoldier.personal_no = event.target.value;
  }
  OnEditName(event:any){
    this.newSoldier.name = event.target.value;
  }
  OnEditRank(event:any){
    this.newSoldier.rank = event.target.value;
  }
  OnEditUnit(event:any){
    this.newSoldier.unit = event.target.value;
  }
  OnEditAppointment(event:any){
    this.newSoldier.appointment = event.target.value;
  }
  OnEditContact(event:any){
    this.newSoldier.contact = event.target.value;
  }
  OnEditJoinDateInUnit(event:any){
    this.newSoldier.unit_join_date = event.target.value;
  }
  OnEditDateOfLastPromotion(event:any){
    this.newSoldier.last_promotion_date = event.target.value;
  }
  OnEditDateOfEnrollment(event:any){
    this.newSoldier.date_of_enrollment = event.target.value;
  }
  OnEditDueDateOfNextRank(event:any){
    this.newSoldier.due_date_of_next_rank = event.target.value;
  }

  async OnClickSaveSoldier(){
    this.requesting = true;
    await this.SoldierService.Update(this.soldiers[this.soldier_index].id, this.newSoldier).then((res) =>{
      window.alert("Sucessfully Updated");
      this.requesting = false;
      this.OnClickClose();
      this.GetAllSoldiers();
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    })
  }

  //Transfer
  OnEditToSubunit(event:any){
    this.newSoldier.subunit = event.target.value;
  }
  OnClickTransferSoldier(){
    if(this.newSoldier.previous_subunit == this.newSoldier.subunit)
    {
      window.alert("New Subunit should be different from the previous subunit.");
      return;
    }

    this.OnClickSaveSoldier();
  }

  //PDF Report
  OnClickGeneratePDF(ind:number)
  {
    this.soldier_index = ind;
    this.requesting = true;
    this.performanceService.GetDefaultData(this.soldiers[this.soldier_index].id).then((res) =>{
      this.report = res;
      this.report_name = this.report.personal_no.toString() + " " + this.report.rank + " " + this.report.name;
      console.log(this.report);
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
    this.report.medical_category = event.target.value;
  }
  OnSelectFirstBiannualPass(event:any){
    this.report.IPFT_first_biannual ="1";
  }

  OnSelectFirstBiannualFail(event:any){
    this.report.IPFT_first_biannual ="0";
  }

  OnEditOrderLetter1(event:any){
    this.report.DIV_order_letter_no_1 = event.target.value;
  }
  OnSelectSecondBiannualPass(event:any){
    this.report.IPFT_second_biannual ="1";
  }

  OnSelectSecondBiannualFail(event:any){
    this.report.IPFT_second_biannual ="0";
  }

  OnEditOrderLetter2(event:any){
    this.report.DIV_order_letter_no_2 = event.target.value;
  }

  OnSelectRetPass(event:any){
    this.report.RET ="1";
  }

  OnSelectRetFail(event:any){
    this.report.RET ="0";
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
    else if(this.report.IPFT_first_biannual == "")
    {
      window.alert("IPFT_first_biannual can not be empty");
      return;
    }
    else if(this.report.IPFT_second_biannual == "")
    {
      window.alert("IPFT_second_biannual can not be empty");
      return;
    }
    else if(this.report.RET == "")
    {
      window.alert("RET can not be empty");
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

    this.requesting = true;
    await this.performanceService.SubmitReport(this.soldiers[this.soldier_index].id, this.report).then((res) =>{
      this.requesting = false;
      window.alert("Data Submitted Successfully");
      this.OnClickClose();
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    });

  }
}
