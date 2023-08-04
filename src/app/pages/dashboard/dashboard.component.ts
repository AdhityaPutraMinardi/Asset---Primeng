import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Component({    
    selector : 'dashboard',
    templateUrl : './dashboard.component.html'
})

export class DashBoardComponent implements OnInit{
    fullName! : string 
    constructor(private authService :AuthService){}
    ngOnInit(): void {
        const profile = this.authService.getProfile();
        if(profile){
            this.fullName = profile.userName;
        }   
    }
}