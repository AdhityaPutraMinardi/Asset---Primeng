import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { RoleResDto } from "../../../dto/role/role.res.dto";
import { UserResDto } from "../../../dto/user/user.res.dto";

import { UserService } from "../../../service/user.service";

@Component({
    selector: 'user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
    roles!: RoleResDto[];
    companies!: CompanyResDto[];
    userUpdateReqDto = this.fb.group({
        userId: [],
        userEmail: [''],
        role: [],
        userName: [''],
        userAddress: [''],
        fileName: [''],
        fileExt: ['']
    });
    userId!: number;
    user!: UserResDto;
    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private activated: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.userService.getRole().subscribe(result => {
            this.roles = result;
        })
        this.activated.params.subscribe(params => {
            this.userUpdateReqDto.patchValue({
                userId: params['id']
            })
        })


    }
    onSubmit(): void {
        const data = this.userUpdateReqDto.getRawValue();
        this.userService.updateUser(data).subscribe(() => {
            this.router.navigateByUrl('/users');
        })
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

                this.userUpdateReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
            })
        }
    }


}