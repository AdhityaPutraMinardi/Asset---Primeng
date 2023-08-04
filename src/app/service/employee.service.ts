
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { EmployeeResDto } from "../dto/employee/employee.res.dto";
import { EmployeeReqDto } from "../dto/employee/employee.req.dto";
import { EmployeeUpdateReqDto } from "../dto/employee/employee-update.req.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";

@Injectable({
    providedIn :'root'
})
export class EmployeeService{
    constructor(private base : BaseService){}
    getAll() : Observable<EmployeeResDto[]>{
        return this.base.get<EmployeeResDto[]>(`${BASE_URL}/employees`);

    }
    create(data : EmployeeReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/employees`,data)
    }
    update(data : EmployeeUpdateReqDto) : Observable <UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/employees`,data)
    }
    delete(id : number) : Observable<DeleteResDto>{
        console.log(id);
        return this.base.delete<DeleteResDto>(`${BASE_URL}/employees/${id}`,true);
    }
}