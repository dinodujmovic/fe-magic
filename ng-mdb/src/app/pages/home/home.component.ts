import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TTime } from "@core/models/types/TTime";
import { HomeFacade } from "@pages/home/home.facade";
import { IMoviesDataState } from "@store/home/home.model";
import { Observable } from "rxjs";
import {IMovieResponse} from "@core/models";

@Component({
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    trendingMoviesTime = "day";
    trendingMovies$: Observable<IMoviesDataState>;
    nowPlayingMovies$: Observable<IMoviesDataState>;

    constructor(private router: Router, private moviesFacade: HomeFacade) {
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

    showMovieDetails(movie: IMovieResponse) {
        this.router.navigate(["movie", movie.id]);
    }
}
