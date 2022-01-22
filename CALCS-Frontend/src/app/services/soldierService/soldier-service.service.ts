import { AppState } from 'src/app-state';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = AppState.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class SoldierServiceService {

  constructor(private http: HttpClient) { }

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

  Create(body:any){
    return this.request('post', `${baseUrl}/core/soldiers/`, body);
  }

  GetAll(){
    return this.request('get', `${baseUrl}/core/soldiers/`);
  }

  GetByID(soldier_id:number){
    return this.request('get', `${baseUrl}/core/soldiers/${soldier_id}/`);
  }

  Delete(soldier_id:number){
    return this.request('delete', `${baseUrl}/core/soldiers/${soldier_id}/`);
  }

  Update(soldier_id:number, body:any){
    return this.request('put', `${baseUrl}/core/soldiers/${soldier_id}/`, body);
  }

  //Soldier Extra
  GetAllExtra(){
    return this.request('get', `${baseUrl}/core/soldierextra/`);
  }

  CreateExtra(body:any){
    return this.request('post', `${baseUrl}/core/soldierextra/`, body);
  }

  GetByIDExtra(soldier_id:number){
    return this.request('get', `${baseUrl}/core/soldier-extra/soldier/${soldier_id}/`);
  }

  UpdateExtra(soldier_id:number, body:any){
    return this.request('put', `${baseUrl}/core/soldierextra/${soldier_id}/`, body);
  }

  DeleteExtra(soldier_id:number){
    return this.request('delete', `${baseUrl}/core/soldierextra/${soldier_id}/`);
  }
}
