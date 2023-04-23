import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ManualSubs } from "@core/helpers/manual-subs";

@Component({
    template: `
        <div class="mdb-movies container mx-auto mt-20">
            <h1>{{ title }}</h1>
        </div>
    `,
})
export class MoviesComponent implements OnDestroy {
    subs = new ManualSubs();
    title = "";

    constructor(private route: ActivatedRoute) {
        // const id = this.route.snapshot.paramMap.get("id");

        this.subs.add = this.route.paramMap.subscribe((params) => {
            const id = params.get("id");

            this.title = `${id}`.toUpperCase();
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
