import { AppState } from 'src/app-state';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = AppState.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class ClerkServiceService {

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
    return this.request('post', `${baseUrl}/clerk-page/clerks/`, body);
  }

  GetAll(){
    return this.request('get', `${baseUrl}/clerk-page/clerks/`);
  }

  GetByID(clerk_id:number){
    return this.request('get', `${baseUrl}/clerk-page/clerks/${clerk_id}/`);
  }
}
