import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MovieResolver } from "@pages/movie/resolvers/movie.resolver";
import { SharedModule } from "@shared/shared.module";

import { MovieRoutingModule } from "./movie-routing.module";

@NgModule({
    declarations: [
        ...MovieRoutingModule.components
    ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        SharedModule
    ],
    providers: [
        MovieResolver
    ]
})
export class MovieModule { }
