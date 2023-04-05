import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

export const environment = {
    production: false,
    development: true,
    moviesAPI: "https://api.themoviedb.org/3",
    assetsAPI: "https://image.tmdb.org/t/p",
    plugins: [
        NgxsReduxDevtoolsPluginModule.forRoot({
        }),
        NgxsLoggerPluginModule.forRoot({
        })
    ]
};
