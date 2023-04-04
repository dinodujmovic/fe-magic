import { Injectable } from "@angular/core";
import { concat, Observable } from "rxjs";

import { TTime } from "@core/models/types/TTime";
import { Select, Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/movies/movies.action";
import { NowPlayingMoviesStateModel, TrendingMoviesStateModel } from "@store/movies/movies.state";

@Injectable()
export class HomeFacade {
    @Select((state: IAppState) => state.movies.trendingMovies) private trendingMovies$!: Observable<TrendingMoviesStateModel>;
    @Select((state: IAppState) => state.movies.nowPlayingMovies) private nowPlayingMovies$!: Observable<NowPlayingMoviesStateModel>;

    constructor(private store: Store) {
    }

    getTrendingMovies$(): Observable<TrendingMoviesStateModel> {
        return this.trendingMovies$;
    }

    getNowPlayingMovies$(): Observable<NowPlayingMoviesStateModel> {
        return this.nowPlayingMovies$;
    }

    loadHomePage(): void {
        // Load the data in this exact order
        concat(this.store.dispatch(new GetTrendingMovies()), this.store.dispatch(new GetNowPlayingMovies()))
    }

    loadTrendingMovies(time: TTime) {
        this.store.dispatch(new GetTrendingMovies(time))
    }
}