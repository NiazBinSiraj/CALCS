import { Officer } from './app/models/officer';
import { Clerk } from "./app/models/clerk";
export class AppState{
    public static instance = new AppState;

    backendURL:string = "https://ahadsheikh.pythonanywhere.com";

    access_token:string = "";
    user_id:number = 0;
    username:string = "";
    user_type:string = "";
    related_id:number = 0;
    isLoggedIn:boolean = false;
}