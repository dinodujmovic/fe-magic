import { Injectable } from "@angular/core";
import { IApiResponse, IMovieResponse } from "@core/models";

import { MovieService } from "@core/services/movie.service";
import { State, Action, StateContext } from "@ngxs/store";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/movies/movies.action";
import { tap } from "rxjs";

export interface TrendingMoviesStateModel {
    data: IMovieResponse[];
    loading: boolean;
    error: any;
    page: number,
    totalPages: number,
    totalResults: number
}

export interface NowPlayingMoviesStateModel {
    data: IMovieResponse[];
    loading: boolean;
    error: any;
    page: number,
    totalPages: number,
    totalResults: number
}

export interface MoviesStateModel {
    selectedMovie: any;
    trendingMovies: TrendingMoviesStateModel;
    nowPlayingMovies: NowPlayingMoviesStateModel;
}

@State<MoviesStateModel>({
    name: "movies",
    defaults: {
        selectedMovie: {},
        trendingMovies: {
            data: [],
            loading: false,
            error: undefined,
            page: 0,
            totalPages: 0,
            totalResults: 0
        },
        nowPlayingMovies: {
            data: [],
            loading: false,
            error: undefined,
            page: 0,
            totalPages: 0,
            totalResults: 0
        }
    }
})

@Injectable()
export class MovieState {
    constructor(private movieService: MovieService) { }

    @Action(GetTrendingMovies)
    getTrendingMovies(ctx: StateContext<MoviesStateModel>, action: GetTrendingMovies) {
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
    getNowPlayingMovies(ctx: StateContext<MoviesStateModel>) {
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
