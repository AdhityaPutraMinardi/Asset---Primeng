import { Component, OnInit } from "@angular/core";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../service/company.service";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { FileService } from "../../../service/file.service";

@Component({
  selector: 'company',
  templateUrl: './company-list.component.html'
})
export class CompanyComponent implements OnInit {
  companies!: CompanyResDto[];
  companyReqDto = this.fb.group({
    companyName: [],
    fileName: [''],
    fileExt: ['']
  })
  companyUpdateReqDto = this.fb.group({
    id : [0],
    companyName: [],
    fileName: [''],
    fileExt: ['']
  })
  deleteId! : number;
  constructor(
    private companyService: CompanyService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private fileService: FileService
  ) { }

  fileShow = this.fileService;
  ngOnInit(): void {
    this.getCompany()


  }
  getCompany() {
    const data = this.companyService.getAll().subscribe(result => {
      this.companies = result;

    })
  }
  onClick(companyId : number) : void{
    this.companyUpdateReqDto.patchValue({
      id : companyId
    })
   this.deleteId = companyId;
  }
  onSubmit(): void {
    const data = this.companyReqDto.getRawValue();
    this.companyService.create(data).subscribe(result => {
      this.getCompany()
    })
  }
  onUpdate(): void {
    const data = this.companyUpdateReqDto.getRawValue();
    this.companyService.update(data).subscribe(result => {
      this.getCompany()
    })
  }

  onDelete() : void{
   this.companyService.delete(this.deleteId).subscribe(result =>{
      this.getCompany()
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

        this.companyReqDto.patchValue({
          fileName: resultBase64,
          fileExt: resultExtension
        })

        this.companyUpdateReqDto.patchValue({
          fileName: resultBase64,
          fileExt: resultExtension
        })
     
      })
    }
  }

}