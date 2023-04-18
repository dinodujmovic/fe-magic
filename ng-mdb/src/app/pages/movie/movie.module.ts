import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MovieRoutingModule } from "./movie-routing.module";

@NgModule({
    declarations: [
        ...MovieRoutingModule.components
    ],
    imports: [
        CommonModule,
        MovieRoutingModule
    ]
})
export class MovieModule { }
