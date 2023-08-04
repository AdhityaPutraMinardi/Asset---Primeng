import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginReqDto } from "../dto/user/login/login.req.dto";
import { Observable } from "rxjs";
import { LoginResDto } from "../dto/user/login/login.res.dto";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn :'root'
})
export class LoginService{
    constructor(private base : BaseService){}

    login(data : LoginReqDto) : Observable<LoginResDto>{
        return this.base.post<LoginResDto>(`${BASE_URL}/login`,data,false);

    }
}