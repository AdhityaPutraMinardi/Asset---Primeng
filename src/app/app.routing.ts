import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseModule } from "./components/base/base.module";
import { BaseComponent } from "./components/base/base.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashBoardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from "@angular/common";
import { roleValidation } from "./validation/role.validation";
import { RoleEnum } from "./constant/role.constant";
import { authValidation, authValidationNonLogin } from "./validation/auth.validation";
import { InputTextModule } from 'primeng/inputtext';
const routes: Routes = [
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/users/user.module').then(u => u.UserModule),
        data : [RoleEnum.SUPER_ADMIN],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'profiles',
        loadChildren: () => import('./pages/profile/profile.module').then(p => p.ProfileModule),
        canMatch : [authValidationNonLogin]
    },
    {
        component: BaseComponent,
        path: 'company',
        loadChildren: () => import('./pages/company/company.module').then(c => c.CompanyModule),
        data : [RoleEnum.SUPER_ADMIN],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'provider',
        loadChildren: () => import('./pages/provider/provider.module').then(p => p.ProviderModule),
        data : [  RoleEnum.SUPER_ADMIN],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'supplier',
        loadChildren: () => import('./pages/supplier/supplier.module').then(s => s.SupplierModule),
        data : [RoleEnum.SUPER_ADMIN],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'employee',
        loadChildren: () => import('./pages/employee/employee.module').then(e => e.EmployeeModule),
        data : [ RoleEnum.SUPER_ADMIN],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'assets',
        loadChildren: () => import('./pages/asset/asset.module').then(as => as.AssetModule),
        data : [ RoleEnum.FINANCE , RoleEnum.HR ],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'invoice',
        loadChildren: () => import('./pages/invoice/invoice.module').then(i => i.InvoiceModule),
        data : [ RoleEnum.FINANCE ],
        canMatch : [authValidationNonLogin,  roleValidation]
    },
    {
        component: BaseComponent,
        path: 'checkout',
        loadChildren: () => import('./pages/checkout/checkout.module').then(co => co.CheckOutModule),
        data : [RoleEnum.HR ],
        canMatch : [authValidationNonLogin, roleValidation]
    },
    {
        path: 'login',
        component: LoginComponent
        ,
        canMatch : [authValidation]

    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [
            {
                path: '',
                component: DashBoardComponent
            }
        ],
        canMatch : [authValidationNonLogin]

    },
    {
        path:'',
        redirectTo : '/login',
        pathMatch : "full"
    },
    {
        path :'**',
        component : NotFoundComponent
    }

]

@NgModule({

    declarations : [
        LoginComponent
    ],
    imports : [
        RouterModule.forRoot(routes),
        BaseModule,
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule
    ],
    exports : [
        RouterModule,
        LoginComponent,
        CommonModule,
        ReactiveFormsModule
    ] 
})
export class AppRouting {

}