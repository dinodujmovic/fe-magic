import { IMovieResponse } from "@core/models";
import { TMoviesType } from "@core/models/types/TMoviesType";

export interface IMoviesDataState {
    data: IMovieResponse[];
    loading: boolean;
    error: any;
    page: number,
    totalPages: number,
    totalResults: number
}

export interface IMoviesState {
    type: TMoviesType,
    selectedMovies: IMoviesDataState;
}
