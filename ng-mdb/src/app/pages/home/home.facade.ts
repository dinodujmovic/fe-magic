import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { concat, Observable } from "rxjs";
import { TTime } from "src/app/core/models/types/TTime";
import { IAppState } from "../../core/store/IAppState";
import { GetNowPlayingMovies, GetTrendingMovies } from "../../core/store/movies/movies.action";
import { TrendingMoviesStateModel, NowPlayingMoviesStateModel } from "../../core/store/movies/movies.state";

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