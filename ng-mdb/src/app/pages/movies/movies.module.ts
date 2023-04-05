import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { MoviesRoutingModule } from '@pages/movies/movies-routing.module';
import { MoviesFacade } from '@pages/movies/movies.facade';

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
