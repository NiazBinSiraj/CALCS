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
  
  criterias:Criteria[] = [];
  
  constructor(private performanceService:PerformanceServiceService) { }

  ngOnInit(): void {
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
          this.criterias = res;
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
        this.isRequesting = false;
      }
    }).catch((err) =>{
      console.log(err);
      window.alert("ERROR");

      this.isRequesting = false;
    });
  }

}
