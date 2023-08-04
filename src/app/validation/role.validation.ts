import { inject } from "@angular/core";
import { Route, UrlSegment } from "@angular/router";
import { AuthService } from "../service/auth.service";

export const roleValidation = (route: Route, segments: UrlSegment[]) =>{
    const auth = inject(AuthService);
    const profile = auth.getProfile();
    if(profile && profile.roleName){
        if(route.data && Array.isArray(route.data)){
            if(route.data.includes(profile.roleName)){
                return true
            }
        }
    }
    return false
}