import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieComponent } from "@pages/movie/movie.component";
import { MovieResolver } from "@pages/movie/resolvers/movie.resolver";

const routes: Routes = [
    {
        path: "",
        component: MovieComponent,
        resolve: {
            resolvedMovie: MovieResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule {
    static components = [MovieComponent];
}
