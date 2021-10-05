import { Clerk } from "./app/models/clerk";
export class AppState{
    public static instance = new AppState;

    backendURL:string = "http://127.0.0.1:8000";

    access_token:string = "";
    user_id:number = 0;
    clerk_id:number = 0;
    username:string = "USER";
    user_type:string = "C";
    isLoggedIn:boolean = true;

    clerkUser:Clerk = new Clerk();
}