import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
const routes : Routes = [
    {
        path : '',
        component : ProfileComponent
    },
    {
        path: 'change-password',
        component : ChangePasswordComponent
    }
]

@NgModule({
    declarations : [
        ProfileComponent,
        ChangePasswordComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports : [
        RouterModule,
        ProfileComponent,
        ChangePasswordComponent
    ]
})
export class ProfileRouting{

}