import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./list/user-list.component";
import { UserCreateComponent } from "./create/user-create.component";
import { UserUpdateComponent } from "./update/user-update.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../app/components/button/button.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'new',
        component: UserCreateComponent

    },
    {
        path: 'update/:id',
        component: UserUpdateComponent
    }
]
@NgModule({
    declarations: [
        UserListComponent,
        UserCreateComponent,
        UserUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule,
        UserListComponent,
        UserCreateComponent,
        UserUpdateComponent
    ]
})
export class UserRouting {

}