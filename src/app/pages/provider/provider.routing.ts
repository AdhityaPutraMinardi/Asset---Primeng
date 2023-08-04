
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ProviderComponent } from "./list/provider.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {
        path : '',
        component : ProviderComponent
    }
    
]

@NgModule({
    declarations : [
        ProviderComponent
      
    ],
    imports : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports : [
        RouterModule,
        ProviderComponent
    ]
})
export class ProviderRouting{

}