import { Clerk } from "./app/models/clerk";
export class AppState{
    public static instance = new AppState;

    
    access_token:string = "";
    user_id:number = 0;
    clerk_id:number = 0;
    username:string = "";
    user_type:string = "";
    isLoggedIn:boolean = false;

    clerkUser:Clerk = new Clerk();
}