import { Injectable } from "@angular/core";
import { IApiResponse, IMovieResponse } from "@core/models";
import { MovieService } from "@core/services/movie.service";
import { Action, State, StateContext } from "@ngxs/store";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/home/home.action";
import { IMoviesDataState } from "@store/home/home.model";
import { tap } from "rxjs";

const initMoviesDataState = (): IMoviesDataState => ({
    data: [],
    loading: false,
    error: undefined,
    page: 0,
    totalPages: 0,
    totalResults: 0
});

export interface IHomeState {
    trendingMovies: IMoviesDataState;
    nowPlayingMovies: IMoviesDataState;
}

@State<IHomeState>({
    name: "home",
    defaults: {
        trendingMovies: initMoviesDataState(),
        nowPlayingMovies: initMoviesDataState()
    }
})

@Injectable()
export class HomeState {
    constructor(private movieService: MovieService) { }

    @Action(GetTrendingMovies)
    getTrendingMovies(ctx: StateContext<IHomeState>, action: GetTrendingMovies) {
        const state = ctx.getState();

        ctx.patchState({
            trendingMovies: {
                ...state.trendingMovies,
                error: undefined,
                loading: true
            },
        });

        return this.movieService.getTrendingMovies(action.time).pipe(
            tap((response: IApiResponse<IMovieResponse[]>) => {
                if ("results" in response) {
                    ctx.patchState({
                        trendingMovies: {
                            data: response.results,
                            page: response.page,
                            totalPages: response.total_pages,
                            totalResults: response.total_results,
                            loading: false,
                            error: undefined
                        }
                    });
                } else {
                    ctx.patchState({
                        trendingMovies: {
                            ...state.trendingMovies,
                            loading: false,
                            error: response.status_message,
                        }
                    });
                }
            })
        );
    }

    @Action(GetNowPlayingMovies)
    getNowPlayingMovies(ctx: StateContext<IHomeState>) {
        const state = ctx.getState();

        ctx.patchState({
            nowPlayingMovies: {
                ...state.nowPlayingMovies,
                error: undefined,
                loading: true
            },
        });

        return this.movieService.getNowPlayingMovies().pipe(
            tap((response: IApiResponse<IMovieResponse[]>) => {
                if ("results" in response) {
                    ctx.patchState({
                        nowPlayingMovies: {
                            data: response.results,
                            page: response.page,
                            totalPages: response.total_pages,
                            totalResults: response.total_results,
                            loading: false,
                            error: undefined
                        }
                    });
                } else {
                    ctx.patchState({
                        nowPlayingMovies: {
                            ...state.nowPlayingMovies,
                            loading: false,
                            error: response.status_message,
                        }
                    });
                }
            })
        );
    }
}
