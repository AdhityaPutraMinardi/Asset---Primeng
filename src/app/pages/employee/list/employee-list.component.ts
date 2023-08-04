import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";

import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { EmployeeService } from "../../../service/employee.service";

@Component({
    selector : 'employee',
    templateUrl : './employee-list.component.html'
})
export class EmployeeComponent implements OnInit{
    employees!:EmployeeResDto[];
    employeeReqDto = this.fb.group({
        employeeName  :[],
        userName : [],
        userAddress : [],
        fileName : [''],
        fileExt : ['']
    })
    employeeUpdateReqDto = this.fb.group({
      id : [0],
      employeeName  :[],
      userName : [],
      userAddress : [],
      fileName : [''],
      fileExt : ['']
  })
  deleteId! : number;
    constructor(private fb : NonNullableFormBuilder,
        private employeeService : EmployeeService){}
   
    ngOnInit(): void {
       this.getEmployee()
        
    }

    getEmployee(){
        this.employeeService.getAll().subscribe(result =>{
            this.employees = result;
        })
    }
    onSubmit() : void{
        const data = this.employeeReqDto.getRawValue();
        this.employeeService.create(data).subscribe(result => {
            this.getEmployee();
        })
    }
    onClick(employeeId : number) : void{
      this.employeeUpdateReqDto.patchValue({
        id : employeeId
      })
     this.deleteId = employeeId;
    }

    onUpdate(): void {
      const data = this.employeeUpdateReqDto.getRawValue();
      this.employeeService.update(data).subscribe(result => {
        this.getEmployee();
      })
    }
  
    onDelete() : void{
     this.employeeService.delete(this.deleteId).subscribe(result =>{
        this.getEmployee();
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
         
            this.employeeReqDto.patchValue({
                fileName : resultBase64,
                fileExt : resultExtension
            })
            this.employeeUpdateReqDto.patchValue({
              fileName : resultBase64,
              fileExt : resultExtension
          })
          
          })
        }
      }
}