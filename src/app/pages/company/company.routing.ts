import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { CompanyComponent } from "./list/company-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
const routes : Routes = [
    {
        path : '',
        component : CompanyComponent
    }
]

@NgModule({
    declarations : [
        CompanyComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule

    ],
    exports : [
        RouterModule,
        CompanyComponent
    ]
})
export class CompanyRouting{

}