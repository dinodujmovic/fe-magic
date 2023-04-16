import { IMovieResponse } from "@core/models";

export interface IMoviesDataState {
    data: IMovieResponse[];
    loading: boolean;
    error: any;
    page: number,
    totalPages: number,
    totalResults: number
}
