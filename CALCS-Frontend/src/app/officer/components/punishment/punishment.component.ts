import { Component, OnInit } from '@angular/core';
import { Observation } from 'src/app/models/observation';
import { PerformanceServiceService } from 'src/app/services/performanceService/performance-service.service';

@Component({
  selector: 'app-punishment',
  templateUrl: './punishment.component.html',
  styleUrls: ['./punishment.component.scss']
})
export class PunishmentComponent implements OnInit {

  isRequesting:boolean = false;
  observations:Observation[] = [];

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

}
