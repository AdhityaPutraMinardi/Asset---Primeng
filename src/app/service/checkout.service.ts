
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { CheckOutResDto } from "../dto/checkout/checkout.res.dto";
import { CheckOutDetailReqListDto } from "../dto/checkout-detail/checkout-detail.req.list.dto";
import { CheckOutDetailResDto } from "../dto/checkout-detail/checkout-detail.res.dto";
import { CheckInReqDto } from "../dto/checkout-detail/checkin.req.dto";


@Injectable({
    providedIn: 'root'
})


export class CheckOutService {
    constructor(private base: BaseService) { }

    getAllCheckOut(): Observable<CheckOutResDto[]> {
        return this.base.get<CheckOutResDto[]>(`${BASE_URL}/checkouts`);
    }
    
    create(data : CheckOutDetailReqListDto) :Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/checkouts`,data);
    }

    checkIn(data : CheckInReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/checkouts`,data);
    }

    getAllDetail(id : number) : Observable<CheckOutDetailResDto[]>{
        return this.base.get<CheckOutDetailResDto[]>(`${BASE_URL}/checkouts/detail?id=${id}`);
    }

    getCheckOut(id : number) : Observable<CheckOutDetailResDto[]>{
        return this.base.get<CheckOutDetailResDto[]>(`${BASE_URL}/checkouts/checkin?id=${id}`);
    }
}