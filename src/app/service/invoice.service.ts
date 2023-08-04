import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { InvoiceResDto } from "../dto/invoice/invoice.res.dto";

import { InsertResDto } from "../dto/res/insert.res.dto";
import { InvoiceDetailsReqDto } from "../dto/invoice-detail/invoice-details.req.dto";
import { InvoiceDetailResDto } from "../dto/invoice-detail/invoice-detail.res.dto";
import { InvoiceUpdateReqDto } from "../dto/invoice/invoice-update.req.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { InvoiceDetailUpdateReqDto } from "../dto/invoice-detail/invoice-detail-update.req.dto";

@Injectable({
    providedIn :'root'
})
export class InvoiceService{
    constructor(private base : BaseService){}
    getAll() : Observable<InvoiceResDto[]>{
        return this.base.get<InvoiceResDto[]>(`${BASE_URL}/invoices`);

    }
    create(data : InvoiceDetailsReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/invoices`,data);
    }

    getUnassigned() : Observable<InvoiceDetailResDto[]>{
        return this.base.get<InvoiceDetailResDto[]>(`${BASE_URL}/invoices/unassigned`);

    }

    getDetailByCode(code : string) : Observable<InvoiceDetailResDto[]>{
        return this.base.get<InvoiceDetailResDto[]>(`${BASE_URL}/invoices/detail?code=${code}`);
    }

    updateInvoice(data : InvoiceUpdateReqDto) :Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/invoices`,data)
    }
    updateInvoiceDetail(data : InvoiceDetailUpdateReqDto) :Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/invoices/detail`,data)
    }
}
