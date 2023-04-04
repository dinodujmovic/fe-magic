import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarouselItemComponent } from '@pages/movies/components/carousel-item/carousel-item.component';
import { CarouselSectionComponent } from '@pages/movies/components/carousel-section/carousel-section.component';
import { HeroComponent } from '@pages/movies/components/hero/hero.component';
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
  static components = [MoviesComponent, HeroComponent, CarouselSectionComponent, CarouselItemComponent];
}
