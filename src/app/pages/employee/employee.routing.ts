import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { EmployeeComponent } from "./list/employee-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes : Routes = [
    {
        path : '',
        component : EmployeeComponent
    }
]

@NgModule({
    declarations : [
        EmployeeComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports : [
        RouterModule,
        EmployeeComponent
    ]
})
export class EmployeeRouting{

}