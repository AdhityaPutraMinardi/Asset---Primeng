import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "src/app/pipes/url.pipe";

@NgModule({
    declarations : [
        NavbarComponent
    ],
    imports : [
        RouterModule,
        CommonModule,
        UrlPipe
    ],
    exports : [
        NavbarComponent
    ]
})

export class NavbarModule{

}