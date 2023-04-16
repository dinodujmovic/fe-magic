import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarouselItemComponent } from "@pages/home/components/carousel-item/carousel-item.component";
import { CarouselSectionComponent } from "@pages/home/components/carousel-section/carousel-section.component";
import { MovieCardComponent } from "@pages/home/components/movie-card/movie-card.component";
import { HomeComponent } from "@pages/home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
    static components = [HomeComponent, MovieCardComponent, CarouselSectionComponent, CarouselItemComponent];
}
