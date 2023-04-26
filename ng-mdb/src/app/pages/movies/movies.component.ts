import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ManualSubs } from "@core/helpers/manual-subs";
import { IMovieResponse, IPaginationResponse } from "@core/models";
import { MoviesFacade } from "@pages/movies/movies.facade";
import { Observable } from "rxjs";

@Component({
    template: `
        <div class="mdb-movies container mx-auto mt-20 mb-20">
            <div class="grid grid-cols-4 gap-4" *ngIf="movies$ | async as movies">
                <div class="grid-cols-3" *ngFor="let movie of movies.results">
                    <mdb-movie-card class="cursor-pointer"
                                    [title]="movie.title"
                                    [poster]="movie.poster_path"
                                    [rating]="movie.vote_average"
                                    [date]="movie.release_date"
                                    (click)="showMovieDetails(movie)">
                    </mdb-movie-card>
                </div>
            </div>

            <div class="flex justify-center mt-10">
                <button class="btn" (click)="loadMore()">Load more</button>
            </div>
        </div>
    `,
})
export class MoviesComponent implements OnDestroy {
    subs = new ManualSubs();
    movies$!: Observable<IPaginationResponse<IMovieResponse[]>>;

    private page = 1;
    private type = "";

    constructor(private route: ActivatedRoute, private router: Router, private moviesFacade: MoviesFacade) {
        // const id = this.route.snapshot.paramMap.get("id");
        this.subs.add = this.route.paramMap.subscribe((params) => {
            this.type = params.get("type")!;
            this.page = 1;
            this.movies$ = this.moviesFacade.getMovies$(this.type, this.page);
        });
    }

    showMovieDetails(movie: IMovieResponse) {
        this.router.navigate(["movie", movie.id]);
    }

    loadMore() {
        this.page += 1;

        this.movies$ = this.moviesFacade.getMovies$(this.type, this.page);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
