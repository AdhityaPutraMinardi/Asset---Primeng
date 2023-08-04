
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { InvoiceListComponent } from "./list/invoice-list.component";
import { InvoiceCreateComponent } from "./create/invoice-create.component";
import { DetailListComponent } from "./details/detail-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


const routes : Routes = [
    {
        path : '',
        component : InvoiceListComponent
    },
    {
        path : 'new',
        component : InvoiceCreateComponent
    },
    {
        path : 'detail/:code',
        component : DetailListComponent
    }
]

@NgModule({
    declarations : [
        InvoiceListComponent,
        InvoiceCreateComponent,
        DetailListComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports : [
        RouterModule,
        InvoiceListComponent,
        InvoiceCreateComponent,
        DetailListComponent
    ]
})
export class InvoiceRouting{

}