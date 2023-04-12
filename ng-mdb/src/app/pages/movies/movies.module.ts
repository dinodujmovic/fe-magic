import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MoviesFacade } from "@pages/movies/movies.facade";
import { MoviesRoutingModule } from "@pages/movies/movies-routing.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [
        ...MoviesRoutingModule.components
    ],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        SharedModule
    ],
    providers: [
        MoviesFacade
    ]
})
export class MoviesModule { }
