import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import { NavbarModule } from "../navbar/navbar.module";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations : [
        BaseComponent
    ],
    imports : [
        NavbarModule,
        RouterModule
    ],
    exports : [
        BaseComponent,
        NavbarModule
    ]
})

export class BaseModule{

}