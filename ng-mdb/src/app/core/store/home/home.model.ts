import { IMoviesDataState } from "@store/movies/movies.model";

export interface IHomeState {
    trendingMovies: IMoviesDataState;
    nowPlayingMovies: IMoviesDataState;
}
