import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: `
        <div class="mdb-movies container mx-auto mt-20">
            <h1>{{ title }}</h1>
        </div>
    `,
})
export class MoviesComponent {
    title = "";

    constructor(private route: ActivatedRoute) {
        const id = this.route.snapshot.paramMap.get("id");

        this.title = `${id}`.toUpperCase();
    }
}
