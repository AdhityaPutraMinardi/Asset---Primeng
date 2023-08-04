import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";


import { InsertResDto } from "../dto/res/insert.res.dto";
import { AssetResDto } from "../dto/asset/asset.res.dto";
import { AssetInsertReqDto } from "../dto/asset/asset-insert.req.dto";
import { AssetTypeResDto } from "../dto/asset-type/asset-type.res.dto";
import { AssetStatusResDto } from "../dto/asset-status/asset-status.res.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { AssetUpdateStatusReqDto } from "../dto/asset/asset-update-status.req.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";
import { AssetUpdateReqDto } from "../dto/asset/asset-update.req.dto";


@Injectable({
    providedIn :'root'
})
export class AssetService{
  
    constructor(private base : BaseService){}
    getAll(type1? : string , type2? : string) : Observable<AssetResDto[]>{
        const type= `?type1=${type1}&type2=${type2}`;
        if(type1 != null && type2 != null){
            return this.base.get<AssetResDto[]>(`${BASE_URL}/assets${type}`);
        }else if(type1 != null ){
            return this.base.get<AssetResDto[]>(`${BASE_URL}/assets?type1=${type1}`);
        }
        else{
            return this.base.get<AssetResDto[]>(`${BASE_URL}/assets`);
        }
        
    }

    create(data : AssetInsertReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/assets`,data);
    }
    update(data : AssetUpdateReqDto): Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/assets`,data);
    }
    getType() : Observable<AssetTypeResDto[]>{
        return this.base.get<AssetTypeResDto[]>(`${BASE_URL}/assets/type`);
    }
    getStatus() : Observable<AssetStatusResDto[]>{
        return this.base.get<AssetStatusResDto[]>(`${BASE_URL}/assets/status`);
    }
    getStatusSupport() : Observable<AssetStatusResDto[]>{
        return this.base.get<AssetStatusResDto[]>(`${BASE_URL}/assets/status/support`);
    }
    updateStatus(data : AssetUpdateStatusReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/assets/status`,data)
    }
    getAssetSupport() : Observable<AssetResDto[]>{
        return this.base.get<AssetResDto[]>(`${BASE_URL}/assets/support`);
    }
    getAssetFinance() : Observable<AssetResDto[]>{
        return this.base.get<AssetResDto[]>(`${BASE_URL}/assets/finance`);
    }
    delete(id : number) : Observable<DeleteResDto>{
        console.log(id);
        return this.base.delete<DeleteResDto>(`${BASE_URL}/assets/${id}`,true);
    }
}