import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { MovieService } from './core/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-mdb';

  constructor(private movieService: MovieService) {
    this.movieService.getTopRatedMovies().subscribe((movies) => {
      console.log(movies);
    })
  }
}
