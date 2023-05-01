import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ManualSubs } from "@core/helpers/manual-subs";
import { IMovieResponse } from "@core/models";
import { TMoviesType } from "@core/models/types/TMoviesType";
import { MoviesFacade } from "@pages/movies/movies.facade";
import { IMoviesDataState } from "@store/movies/movies.model";
import { Observable } from "rxjs";

@Component({
    template: `
        <div class="mdb-movies container mx-auto mt-20 mb-20">
            <div *ngIf="movies$ | async as movies">
                <div class="grid grid-cols-4 gap-4">
                    <div class="grid-cols-3" *ngFor="let movie of movies.data">
                        <mdb-movie-card class="cursor-pointer"
                                        [title]="movie.title"
                                        [poster]="movie.poster_path"
                                        [rating]="movie.vote_average"
                                        [date]="movie.release_date"
                                        (click)="showMovieDetails(movie)">
                        </mdb-movie-card>
                    </div>
                </div>

                <div class="flex justify-center mt-10" >
                    <button class="btn" *ngIf="!movies.loading && movies.totalPages > page" (click)="loadMore()">Load more</button>
                </div>
            </div>
        </div>
    `,
})
export class MoviesComponent implements OnDestroy {
    subs = new ManualSubs();
    movies$!: Observable<IMoviesDataState>;

    public page = 1;
    private type: TMoviesType = "popular";

    constructor(private route: ActivatedRoute, private router: Router, private moviesFacade: MoviesFacade) {
        // const id = this.route.snapshot.paramMap.get("id");
        this.subs.add = this.route.paramMap.subscribe((params) => {
            this.type = params.get("type") as TMoviesType || "popular";
            this.page = 1;
            this.movies$ = this.moviesFacade.getSelectedMovie$();
            this.moviesFacade.getMovies(this.type, this.page);
        });
    }

    showMovieDetails(movie: IMovieResponse) {
        this.router.navigate(["movie", movie.id]);
    }

    loadMore() {
        this.page += 1;

        this.moviesFacade.getMovies(this.type, this.page);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
