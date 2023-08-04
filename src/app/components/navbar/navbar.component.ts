import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoleEnum } from "src/app/constant/role.constant";
import { AuthService } from "src/app/service/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
    imgUrl!: number;
    role!: string
    constructor(private authService: AuthService,
        private router : Router) { }
    ngOnInit(): void {
        const profile = this.authService.getProfile();
        if (profile) {
            this.imgUrl = profile.fileId
            this.role = profile.roleName;
        }
    }

    get isAdmin() {
         
        return this.role == RoleEnum.SUPER_ADMIN

       

    }

    get isFinance() {
        return this.role == RoleEnum.FINANCE
    }

    get isHR() {
        return this.role == RoleEnum.HR
    }

    logout(){
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

}