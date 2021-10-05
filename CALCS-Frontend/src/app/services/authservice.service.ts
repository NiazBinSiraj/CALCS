import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app-state';

const baseUrl = AppState.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

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

  Login(body: { username: string; password: string }) {
    return this.request('post', `${baseUrl}/api/token/`,body);
  }

  IsAdmin(id:any){
    return this.request('get', `${baseUrl}/isadmin/${id}/`);
  }

  DecodeJWT(body:any){
    return this.request('post', `${baseUrl}/clerk/decodejwt/`, body);
  }
}
