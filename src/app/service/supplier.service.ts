import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { SupplierResDto } from "../dto/supplier/supplier.res.dto";
import { SupplierReqDto } from "../dto/supplier/supplier.req.dto";
import { SupplierUpdateReqDto } from "../dto/supplier/supplier-update.req.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";


@Injectable({
    providedIn : 'root'
})
export class SupplierService{
    constructor(private base : BaseService){}

    getAll() : Observable<SupplierResDto[]>{
        return this.base.get<SupplierResDto[]>(`${BASE_URL}/suppliers`)
    }

    create(data : SupplierReqDto):Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/suppliers`,data);
    }
    update(data : SupplierUpdateReqDto) : Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/suppliers`,data)
    }
    delete(id : number) : Observable<DeleteResDto>{
        console.log(id);
        return this.base.delete<DeleteResDto>(`${BASE_URL}/suppliers/${id}`,true);
    }
}