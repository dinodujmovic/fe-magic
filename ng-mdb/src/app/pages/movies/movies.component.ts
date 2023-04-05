import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { TTime } from "@core/models/types/TTime";
import { NowPlayingMoviesStateModel, TrendingMoviesStateModel } from "@store/movies/movies.state";
import { MoviesFacade } from "@pages/movies/movies.facade";

@Component({
    templateUrl: "./movies.component.html",
})
export class MoviesComponent {
    trendingMoviesTime = "day";
    trendingMovies$: Observable<TrendingMoviesStateModel>;
    nowPlayingMovies$: Observable<NowPlayingMoviesStateModel>;

    constructor(private moviesFacade: MoviesFacade) {
        this.moviesFacade.loadHomePage();

        this.trendingMovies$ = this.moviesFacade.getTrendingMovies$();
        this.nowPlayingMovies$ = this.moviesFacade.getNowPlayingMovies$();
    }

    getTrendingMovies(time: TTime) {
        if (this.trendingMoviesTime === time) {
            return;
        }

        this.trendingMoviesTime = time;
        this.moviesFacade.loadTrendingMovies(time);
    }
}
