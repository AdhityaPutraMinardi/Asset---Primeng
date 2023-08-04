
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { CheckOutListComponent } from "./list/checkout-list.component";
import { CheckOutCreateComponent } from "./create/checkout-create.component";
import { CheckOutDetailListComponent } from "./detail/detail-list.component";
import { CheckInComponent } from "./checkin/checkin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {
        path : '',
        component : CheckOutListComponent
    },
    {
        path : 'new',
        component : CheckOutCreateComponent
    },
    {
        path : 'detail/:id',
        component : CheckOutDetailListComponent
    },
    {
        path : 'checkin',
        component : CheckInComponent
    }
    
]

@NgModule({
    declarations : [
        CheckOutListComponent,
        CheckOutCreateComponent,
        CheckOutDetailListComponent,
        CheckInComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports : [
        RouterModule,
        CheckOutListComponent,
        CheckOutCreateComponent,
        CheckOutDetailListComponent,
        CheckInComponent
    ]
})
export class CheckOutRouting{

}