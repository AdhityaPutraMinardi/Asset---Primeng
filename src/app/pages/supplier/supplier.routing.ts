import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { SupplierComponent } from "./list/supplier-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "src/app/pipes/url.pipe";


const routes : Routes = [
    {
        path : '',
        component : SupplierComponent
    }
]
@NgModule({
    declarations : [
        SupplierComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,
        UrlPipe
    ],
    exports : [
        RouterModule,
        SupplierComponent
    ]
})
export class SupplierRouting{

}