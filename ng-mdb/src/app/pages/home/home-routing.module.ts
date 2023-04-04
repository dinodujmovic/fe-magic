import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarouselItemComponent } from '@pages/home/components/carousel-item/carousel-item.component';
import { CarouselSectionComponent } from '@pages/home/components/carousel-section/carousel-section.component';
import { HeroComponent } from '@pages/home/components/hero/hero.component';
import { HomeComponent } from '@pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static components = [HomeComponent, HeroComponent, CarouselSectionComponent, CarouselItemComponent];
}
