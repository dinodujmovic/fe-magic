import { IHomeState } from "@store/home/home.model";
import { IMoviesState } from "@store/movies/movies.model";
import { ISettingsState } from "@store/settings/settings.model";

export interface IAppState {
    home: IHomeState
    settings: ISettingsState
    movies: IMoviesState
}
