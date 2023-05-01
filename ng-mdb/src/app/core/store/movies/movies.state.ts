import { Injectable } from "@angular/core";
import { IErrorResponse, IMovieResponse, IPaginationResponse } from "@core/models";
import { MovieService } from "@core/services/movie.service";
import { Action, State, StateContext } from "@ngxs/store";
import { GetSelectedMovies } from "@store/movies/movies.action";
import { IMoviesDataState, IMoviesState } from "@store/movies/movies.model";
import {
    catchError, tap, throwError
} from "rxjs";

const initMoviesDataState = (): IMoviesDataState => ({
    data: [],
    loading: false,
    error: undefined,
    page: 0,
    totalPages: 0,
    totalResults: 0
});

@State<IMoviesState>({
    name: "movies",
    defaults: {
        type: "popular",
        selectedMovies: initMoviesDataState()
    }
})

@Injectable()
export class MoviesState {
    constructor(private movieService: MovieService) { }

    @Action(GetSelectedMovies)
    getSelectedMovies(ctx: StateContext<IMoviesState>, action: GetSelectedMovies) {
        const state = ctx.getState();
        let movies$;

        switch (action.type) {
            case "popular":
                movies$ = this.movieService.getPopularMovies(action.page);
                break;
            case "upcoming":
                movies$ = this.movieService.getUpcomingMovies(action.page);
                break;
            case "now-playing":
                movies$ = this.movieService.getNowPlayingMovies(action.page);
                break;
            default:
                movies$ = this.movieService.getPopularMovies(action.page);
        }

        ctx.patchState({
            type: action.type,
            selectedMovies: {
                ...state.selectedMovies,
                error: undefined,
                loading: true
            },
        });

        return movies$.pipe(
            tap((response: IPaginationResponse<IMovieResponse[]>) => {
                const data = (action.type === state.type) ? [...state.selectedMovies.data, ...response.results] : response.results;

                ctx.patchState({
                    selectedMovies: {
                        data,
                        page: response.page,
                        totalPages: response.total_pages,
                        totalResults: response.total_results,
                        loading: false,
                        error: undefined
                    }
                });
            }),
            catchError((error: IErrorResponse) => {
                ctx.patchState({
                    selectedMovies: {
                        ...state.selectedMovies,
                        loading: false,
                        error: error.status_message,
                    }
                });

                return throwError(() => error);
            })
        );
    }
}
