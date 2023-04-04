import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TTime } from '@core/models/types/TTime';
import { HomeFacade } from '@pages/home/home.facade';
import { NowPlayingMoviesStateModel, TrendingMoviesStateModel } from '@store/movies/movies.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendingMoviesTime = 'day';
  trendingMovies$: Observable<TrendingMoviesStateModel>;
  nowPlayingMovies$: Observable<NowPlayingMoviesStateModel>;

  constructor(private homeFacade: HomeFacade) {
    this.homeFacade.loadHomePage();

    this.trendingMovies$ = this.homeFacade.getTrendingMovies$();
    this.nowPlayingMovies$ = this.homeFacade.getNowPlayingMovies$();
  }

  getTrendingMovies(time: TTime) {
    if (this.trendingMoviesTime === time) {
      return;
    }

    this.trendingMoviesTime = time;
    this.homeFacade.loadTrendingMovies(time);
  }
}
