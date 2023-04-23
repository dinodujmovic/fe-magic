import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PreloadModulesStrategy } from "@core/strategies/preload-modules.strategy";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/"
    },
    {
        path: "",
        data: { preload: true },
        loadChildren: () => import("@pages/home/home.module").then((m) => m.HomeModule)
    },
    {
        path: "movies",
        data: { preload: false },
        loadChildren: () => import("@pages/movies/movies.module").then((m) => m.MoviesModule)
    },
    {
        path: "movie/:id",
        data: { preload: true },
        loadChildren: () => import("@pages/movie/movie.module").then((m) => m.MovieModule)
    },
    {
        path: "settings",
        data: { preload: false },
        loadChildren: () => import("@pages/settings/settings.module").then((m) => m.SettingsModule)
    },
    { path: "**", redirectTo: "/" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadModulesStrategy })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
