import { Observation } from './../../../models/observation';
import { Component, OnInit } from '@angular/core';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';

@Component({
  selector: 'app-punishment',
  templateUrl: './punishment.component.html',
  styleUrls: ['./punishment.component.scss']
})
export class PunishmentComponent implements OnInit {

  isRequesting:boolean = false;
  isEdit:number = -1;
  
  observations:Observation[] = [];
  newObservation:Observation = new Observation;

  constructor(private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
    this.GetAllObservation();
  }

  async GetAllObservation()
  {
    this.isRequesting = true;
    await this.performanceService.GetAllObservations().then((res) =>{
      this.observations = res;

      this.isRequesting = false;
    }).catch((err) =>{
      window.alert("Error");

      this.isRequesting = false;
    });
  }

  OnEditObservation(event:any)
  {
    this.newObservation.message = event.target.value;
  }

  async OnClickAdd()
  {
    this.isRequesting = true;
    await this.performanceService.CreateObservation({message : this.newObservation.message}).then((res) =>{
      console.log(res);
      window.alert("Observation added successfully.");

      this.isRequesting = false;

      this.GetAllObservation();
      this.newObservation.message = "";
    }).catch((err) =>{
      console.log(err);
      window.alert("Error");

      this.isRequesting = false;
    });
  }

  async OnClickDelete(id:number)
  {
    this.isRequesting = true;
    
    await this.performanceService.DeleteObservation(this.observations[id].id).then((res) =>{
      console.log(res);
      window.alert("Deleted SUccessfully");

      this.isRequesting = false;

      this.GetAllObservation();

      this.newObservation.message = "";
    }).catch((err) =>{
      window.alert("Error");
      console.log(err);

      this.isRequesting = false;
    });
  }

  OnClickEdit(id:any)
  {
    this.isEdit = id;
    this.newObservation.message = this.observations[id].message;
  }

  async OnClickSave(id: any)
  {
    this.isRequesting = true;
    
    await this.performanceService.UpdateObservation(this.observations[id].id, {message: this.newObservation.message}).then((res) => {
      console.log(res);
      window.alert("Updated Successfully");

      this.isRequesting = false;
      this.OnClickCancel();
      this.GetAllObservation();
      this.newObservation.message = "";
    }).catch((err) =>{
      console.log(err);
      window.alert("ERROR");

      this.isRequesting = false;
    });
  }

  OnClickCancel()
  {
    this.isEdit = -1;
    this.newObservation.message = "";
  }

}
