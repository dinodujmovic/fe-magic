import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeFacade } from "@pages/home/home.facade";
import { HomeRoutingModule } from "@pages/home/home-routing.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [
        ...HomeRoutingModule.components
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    providers: [
        HomeFacade
    ]
})
export class HomeModule { }
