import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";

import { MoviesRoutingModule } from "./movies-routing.module";

@NgModule({
    declarations: [
        ...MoviesRoutingModule.components
    ],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        SharedModule
    ]
})
export class MoviesModule { }
