import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app-state';

const baseUrl = AppState.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class OfficerServiceService {

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
    return this.request('post', `${baseUrl}/officer-page/officers/`, body);
  }

  GetAll(){
    return this.request('get', `${baseUrl}/officer-page/officers/`);
  }

  GetByID(officer_id:number){
    return this.request('get', `${baseUrl}/officer-page/officers/${officer_id}/`);
  }
}
