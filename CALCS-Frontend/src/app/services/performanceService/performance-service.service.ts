import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app-state';

const baseUrl = AppState.instance.backendURL;

@Injectable({
  providedIn: 'root'
})

export class PerformanceServiceService {

  constructor(private http: HttpClient) {}

  private async request(method: string, url: string, data?: any) {
    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  GenerateCriteria(){
    return this.request('get', `${baseUrl}/core/make-criterias/`);
  }

  GetAllCriteria(){
    return this.request('get', `${baseUrl}/core/criterias/`);
  }

  GetAllSubCriteria(criteria_id:any, subunit:string){
    return this.request('get', `${baseUrl}/core/change-criteria/${criteria_id}/?subunit=${subunit}`);
  }

  CreateSubCriteria(body:any){
    return this.request('post', `${baseUrl}/core/subcriterias/`, body);
  }

  GetSubCriteria(subcriteria_id:any){
    return this.request('get', `${baseUrl}/core/subcriterias/${subcriteria_id}`);
  }

  DeleteSubCriteria(subcriteria_id:any){
    return this.request('delete', `${baseUrl}/core/subcriterias/${subcriteria_id}`);
  }

  UpdateSubCriteriaMarks(criteria_id:any, body:any){
    return this.request('post', `${baseUrl}/core/change-criteria/${criteria_id}/`, body);
  }

  GetAssesment(soldier_id:any, criteria_id:any){
    return this.request('get', `${baseUrl}/core/assessment/soldier/${soldier_id}/criteria/${criteria_id}`);
  }

  SetAssesment(soldier_id:any, criteria_id:any, body:any){
    return this.request('post', `${baseUrl}/core/assessment/soldier/${soldier_id}/criteria/${criteria_id}/`, body);
  }

  CreateObservation(body:any){
    console.log(body);
    return this.request('post', `${baseUrl}/core/observations/`, body);
  }

  GetAllObservations(){
    return this.request('get', `${baseUrl}/core/observations`);
  }

  GetObservation(observation_id:any){
    return this.request('get', `${baseUrl}/core/observations/${observation_id}`);
  }

  UpdateObservation(observation_id:any, body:any){
    return this.request('put', `${baseUrl}/core/observations/${observation_id}/`, body);
  }

  DeleteObservation(observation_id:any){
    return this.request('delete', `${baseUrl}/core/observations/${observation_id}`);
  }

  CreateSoldierObservation(soldier_id:any, body:any){
    return this.request('post', `${baseUrl}/core/observations/soldier/${soldier_id}/`, body);
  }

  GetSoldierObservation(soldier_id:any){
    return this.request('get', `${baseUrl}/core/observations/soldier/${soldier_id}/`);
  }

  //PDF Report
  GetDefaultData(soldier_id:any){
    return this.request('get', `${baseUrl}/core/report/soldier/${soldier_id}/`);
  }
  SubmitReport(soldier_id:any, body:any){
    return this.request('post', `${baseUrl}/core/report/soldier/${soldier_id}/`, body);
  }
  CheckReport(soldier_id:any){
    return this.request('get', `${baseUrl}/core/report/download/check/${soldier_id}/`);
  }
}
