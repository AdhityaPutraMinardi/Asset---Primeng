import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AssetListComponent } from "./list/asset-list.component";
import { AssetCreateComponent } from "./create/asset-create.component";
import { AssetUpdateComponent } from "./update/asset-update.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {
        path : '',
        component : AssetListComponent
    },
    {
        path :'new',
        component : AssetCreateComponent
    },
    {
        path :'update/:id',
        component : AssetUpdateComponent
    }
]
@NgModule({
    declarations : [
        AssetListComponent,
        AssetCreateComponent,
        AssetUpdateComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports : [
        RouterModule,
        AssetListComponent,
        AssetCreateComponent,
        AssetUpdateComponent
    ]
})
export class AssetRouting{

}