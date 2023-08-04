import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { LoginService } from "../../service/login.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loginReqDto = this.fb.group({
        userEmail: ['', [Validators.required, Validators.maxLength(30)]],
        userPassword: ['', [Validators.required]]
    })
    loading = false;
    constructor(
        private fb: NonNullableFormBuilder,
        private loginService : LoginService,
        private router : Router,
        private title : Title) {
            this.title.setTitle('DashBoard | Asset Adhit');
    }
    onLogin() {
        if (this.loginReqDto.valid) {
            this.loading = true
            
            const data = this.loginReqDto.getRawValue();
            this.loginService.login(data).subscribe(result => (
                localStorage.setItem('data',JSON.stringify(result)),
                this.router.navigateByUrl('/dashboard'),
                this.loading = false        
            ))
        } else {
            console.log('Invalid');
        }

    }


}