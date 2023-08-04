import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { CompanyReqDto } from "../dto/company/company.req.dto";
import { InsertResDto } from "../dto/res/insert.res.dto";
@Injectable({
    providedIn :'root'
})
export class FileService{
    constructor(private base : BaseService){}
    getAll() : Observable<any[]>{
        return this.base.get<any>(`${BASE_URL}/files`);

    }
}