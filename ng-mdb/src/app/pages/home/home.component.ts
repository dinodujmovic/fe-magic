import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TTime } from 'src/app/core/models/types/TTime';
import { NowPlayingMoviesStateModel, TrendingMoviesStateModel } from 'src/app/core/store/movies/movies.state';
import { HomeFacade } from './home.facade';

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
