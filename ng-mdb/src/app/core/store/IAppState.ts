import { MoviesStateModel } from "./movies/movies.state";
import { SettingsStateModel } from "./settings/settings.state";

export interface IAppState {
    movies: MoviesStateModel
    settings: SettingsStateModel
}