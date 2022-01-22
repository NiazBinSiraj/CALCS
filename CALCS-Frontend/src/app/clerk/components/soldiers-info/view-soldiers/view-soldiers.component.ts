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

  download_url = "";
  report_status:string = "";
  pdf_found:boolean = false;

  clickedInfo:boolean = false;

  info_body = {
    "soldier": -1,
    "medical_category": "",
    "IPFT_first_biannual": 0,
    "IPFT_second_biannual": 0,
    "RET": 0
  };

  constructor(private SoldierService:SoldierServiceService, private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.GetAllSoldiers();
  }

  async OnClickInfo(){
    this.clickedInfo = true;
    this.requesting = true;
    await this.SoldierService.GetByIDExtra(this.soldiers[this.soldier_index].id).then((res) =>{
      console.log(res);
      this.info_body = res;
      this.requesting = false;
    }).catch((err) =>{
      this.requesting = false;
      console.log(err);
      console.log(this.info_body);
    });
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
    this.clickedInfo = false;
  }

  OnClickCriteria(ind:number)
  {
    this.criteria_index = ind;
    this.GetAllSubCriteria();
    this.clickedInfo = false;
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
      this.modal_report = true;
    }).catch((err) =>{
      console.log(err);
      this.requesting = false;
      window.alert("ERROR");
    });
  }

  StringToDate(dateString:string)
  {
    console.log(dateString);
    return new Date(dateString);
  }
}
