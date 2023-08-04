import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { UserService } from "../../../service/user.service";
import {  Router } from "@angular/router";
import { NonNullableFormBuilder } from "@angular/forms";
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
    user?: UserResDto;
    userReqDto = this.fb.group({
        id: [0],
        userName: [''],
        userAddress: [''],
        fileName: [''],
        fileExt: ['']

    })
    constructor(private authService: AuthService,
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }
    ngOnInit(): void {
        const profile = this.authService.getProfile();
        if (profile) {
            this.userReqDto.patchValue({
                id: profile.id
            })

            this.userService.getById(profile.id).subscribe(result => {
                this.user = result;

            })
          
        }
    }

    onSubmit() {
        const data = this.userReqDto.getRawValue()
        this.userService.updateProfile(data).subscribe(result =>{
            
        });
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.userReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
               
            })
        }
    }
}