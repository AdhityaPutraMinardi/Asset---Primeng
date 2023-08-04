import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { ProviderResDto } from "../dto/provider/provider.res.dto";
import { ProviderReqDto } from "../dto/provider/provider.req.dto";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { ProviderUpdateReqDto } from "../dto/provider/provider-update.req.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";


@Injectable({
    providedIn : 'root'
})
export class ProviderService{
    constructor(private base : BaseService){}
    getAll() : Observable<ProviderResDto[]>{
        return this.base.get<ProviderResDto[]>(`${BASE_URL}/providers`)
    }

    create(data : ProviderReqDto):Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/providers`,data);
    }

    update(data : ProviderUpdateReqDto) : Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/providers`,data)
    }
    delete(id : number) : Observable<DeleteResDto>{
        console.log(id);
        return this.base.delete<DeleteResDto>(`${BASE_URL}/providers/${id}`,true);
    }

}