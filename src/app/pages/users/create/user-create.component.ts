import { Component, OnInit } from "@angular/core";
import { FormBuilder, NonNullableFormBuilder } from "@angular/forms";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { RoleResDto } from "../../../dto/role/role.res.dto";

import { CompanyService } from "../../../service/company.service";
import { UserService } from "../../../service/user.service";
import { Router } from "@angular/router";


@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {
    roles!: RoleResDto[];
    companies!: CompanyResDto[];

    userReqDto = this.fb.group({
        userEmail: [''],
        role: [],
        company: [],
        userName: [''],
        userAddress: [''],
        fileName: [''],
        fileExt: ['']
    });

    constructor(
        private userService: UserService,
        private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.userService.getRole().subscribe(result => {
            this.roles = result;
        })
        this.companyService.getAll().subscribe(result => {
            this.companies = result;
        })
      
    }
    onSubmit(): void {
        const data = this.userReqDto.getRawValue();
        this.userService.create(data).subscribe(result => {
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

                this.userReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
            })
        }
    }
}
