
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { UserResDto } from "../dto/user/user.res.dto";
import { RoleResDto } from "../dto/role/role.res.dto";
import { UserReqDto } from "../dto/user/user.req.dto";
import { InsertResDto } from "../dto/res/insert.res.dto";
import { UserUpdateReqDto } from "../dto/user/user-update.req.dto";
import { UpdateResDto } from "../dto/res/update.res.dto";
import { ChangePasswordReqDto } from "../dto/user/login/change-password.req.dto";
import { ChangePasswordResDto } from "../dto/user/login/change-password.res.dto";
import { DeleteResDto } from "../dto/res/delete.res.dto";
import { ProfileUpdateReqDto } from "../dto/user/profile-update.req.dto";

@Injectable({
    providedIn :'root'
})
export class UserService{
    constructor(private base : BaseService){}
    getAll() : Observable<UserResDto[]>{
        return this.base.get<UserResDto[]>(`${BASE_URL}/users`);

    }

    getById(id : number) : Observable<UserResDto>{
        return this.base.get<UserResDto>(`${BASE_URL}/users/user?id=${id}`);

    }

    updatePassword(data : ChangePasswordReqDto) : Observable<ChangePasswordResDto>{
        return this.base.patch<ChangePasswordResDto>(`${BASE_URL}/users/update`,data);
    }

    updateUser(data : UserUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users`,data);
    }

    updateProfile(data : ProfileUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/update/profile`,data);
    }

    delete(id : number) : Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/users/${id}`,true);
    }
    getRole() : Observable<RoleResDto[]>{
        return this.base.get<RoleResDto[]>(`${BASE_URL}/users/role`);

    }

    create(data : UserReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/users`,data);
    }

}