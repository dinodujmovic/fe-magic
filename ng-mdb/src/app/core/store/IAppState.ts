import { MoviesStateModel } from "@store/movies/movies.state"
import { SettingsStateModel } from "@store/settings/settings.state"

export interface IAppState {
    movies: MoviesStateModel
    settings: SettingsStateModel
}