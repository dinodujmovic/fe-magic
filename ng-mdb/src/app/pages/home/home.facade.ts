import { Injectable } from "@angular/core";
import { TTime } from "@core/models/types/TTime";
import { Select, Store } from "@ngxs/store";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/home/home.action";
import { IMoviesDataState } from "@store/home/home.model";
import { IAppState } from "@store/IAppState";
import { concat, Observable } from "rxjs";

@Injectable()
export class HomeFacade {
    @Select((state: IAppState) => state.home.trendingMovies)
    private trendingMovies$!: Observable<IMoviesDataState>;

    @Select((state: IAppState) => state.home.nowPlayingMovies)
    private nowPlayingMovies$!: Observable<IMoviesDataState>;

    constructor(private store: Store) {
    }

    getTrendingMovies$(): Observable<IMoviesDataState> {
        return this.trendingMovies$;
    }

    getNowPlayingMovies$(): Observable<IMoviesDataState> {
        return this.nowPlayingMovies$;
    }

    loadHomePage(): void {
        // Load the data in this exact order
        concat(this.store.dispatch(new GetTrendingMovies()), this.store.dispatch(new GetNowPlayingMovies()));
    }

    loadTrendingMovies(time: TTime) {
        this.store.dispatch(new GetTrendingMovies(time));
    }
}
