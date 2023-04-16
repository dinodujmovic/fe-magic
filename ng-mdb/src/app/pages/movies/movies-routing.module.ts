import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesGuard } from "@pages/movies/guards/movies.guard";
import { MoviesComponent } from "@pages/movies/movies.component";

const routes: Routes = [
    {
        path: "",
        component: MoviesComponent,
    },
    {
        path: ":id",
        component: MoviesComponent,
        canActivate: [MoviesGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [MoviesGuard]
})
export class MoviesRoutingModule {
    static components = [MoviesComponent];
}
