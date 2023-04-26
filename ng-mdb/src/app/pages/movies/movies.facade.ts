import { Injectable } from "@angular/core";
import { MovieService } from "@core/services/movie.service";

@Injectable()
export class MoviesFacade {
    constructor(private movieService: MovieService) {
    }

    public getMovies$(type: string, page: number) {
        let movies$;

        switch (type) {
            case "upcoming":
                movies$ = this.movieService.getUpcomingMovies(page);
                break;
            case "now-playing":
                movies$ = this.movieService.getNowPlayingMovies(page);
                break;
            default:
                movies$ = this.movieService.getPopularMovies(page);
        }

        return movies$;
    }

    getPopularMovies$(page: number) {
        return this.movieService.getPopularMovies(page);
    }

    getNowPlayingMovies$(page: number) {
        return this.movieService.getNowPlayingMovies(page);
    }

    getUpcomingMovies$(page: number) {
        return this.movieService.getUpcomingMovies(page);
    }
}
