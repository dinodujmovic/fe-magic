import { Injectable } from "@angular/core";
import { TMoviesType } from "@core/models/types/TMoviesType";
import { MovieService } from "@core/services/movie.service";
import { Select, Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { GetSelectedMovies } from "@store/movies/movies.action";
import { IMoviesDataState } from "@store/movies/movies.model";
import { Observable } from "rxjs";

@Injectable()
export class MoviesFacade {
    @Select((state: IAppState) => state.movies.selectedMovies)
    private selectedMovies$!: Observable<IMoviesDataState>;

    constructor(private store: Store, private movieService: MovieService) {
    }

    public getSelectedMovie$() {
        return this.selectedMovies$;
    }

    public getMovies(type: TMoviesType, page: number) {
        this.store.dispatch(new GetSelectedMovies(type, page));
    }
}
