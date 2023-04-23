import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IMoveDetailsResponse } from "@core/models";

@Component({
    selector: "mdb-movie",
    templateUrl: "./movie.component.html"
})
export class MovieComponent {
    movie: IMoveDetailsResponse;
    constructor(private route: ActivatedRoute) {
        this.movie = this.route.snapshot.data.resolvedMovie;
    }
}
