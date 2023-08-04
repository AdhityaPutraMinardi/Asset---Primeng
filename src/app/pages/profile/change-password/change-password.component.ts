import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import { UserService } from "../../../service/user.service";
import { response } from "../../../service/base.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
    passwordReqDto = this.fb.group({
        userEmail: [],
        oldPassword: [],
        newPassword: [],
        confirmNewPassword : []

    })
    id!: number;
    // newPassword!: string;
    confirmNewPassword!: string;
    constructor(private authService: AuthService,
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private toast : ToastrService
        ) { }
    ngOnInit(): void {
        const profile = this.authService.getProfile();

    }
 
    onSubmit() {
        if (this.passwordReqDto.get(`newPassword`)?.value != this.passwordReqDto.get(`confirmNewPassword`)?.value) {
            this.toast.error('New And Confirm Password Didnt Match ');
        } else {
            const data = this.passwordReqDto.getRawValue()
            this.userService.updatePassword(data).subscribe(() => {
                this.router.navigateByUrl('/users');
            })
        }

    }


}