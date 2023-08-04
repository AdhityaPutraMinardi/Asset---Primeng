import { Injectable } from "@angular/core";
import { LoginResDto } from "../dto/user/login/login.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AuthService {
    getProfile() : LoginResDto | null{
        const data = localStorage.getItem('data');
        if(data){
            return JSON.parse(data);
        }
        return null;
    }
}