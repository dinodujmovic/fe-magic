import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarouselItemComponent } from '@pages/movies/components/carousel-item/carousel-item.component';
import { CarouselSectionComponent } from '@pages/movies/components/carousel-section/carousel-section.component';
import { MovieCardComponent } from '@pages/movies/components/movie-card/movie-card.component';
import { MoviesComponent } from '@pages/movies/movies.component';

const routes: Routes = [
    {
        path: '',
        component: MoviesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule {
    static components = [MoviesComponent, MovieCardComponent, CarouselSectionComponent, CarouselItemComponent];
}
