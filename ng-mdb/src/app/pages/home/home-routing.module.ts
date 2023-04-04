import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { CarouselSectionComponent } from './components/carousel-section/carousel-section.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './home.component';

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
