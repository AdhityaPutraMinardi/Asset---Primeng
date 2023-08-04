
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { CompanyReqDto } from "../dto/company/company.req.dto";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { CompanyUpdateReqDto } from "../dto/company/company-update.req.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";

@Injectable({
    providedIn :'root'
})
export class CompanyService{
    constructor(private base : BaseService){}
    getAll() : Observable<CompanyResDto[]>{
        return this.base.get<CompanyResDto[]>(`${BASE_URL}/companies`);

    }
    create(data : CompanyReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/companies`,data)
    }
    update(data : CompanyUpdateReqDto) : Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/companies`,data)
    }
    delete(id : number) : Observable<DeleteResDto>{
        console.log(id);
        return this.base.delete<DeleteResDto>(`${BASE_URL}/companies/${id}`,true);
    }
}