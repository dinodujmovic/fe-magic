import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot
} from "@angular/router";
import { MovieService } from "@core/services/movie.service";
import { ToasterService } from "@core/shell/toaster/toaster.service";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MovieResolver implements Resolve<any> {
    constructor(private router: Router, private toasterService: ToasterService, private movieService: MovieService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        const id = route.paramMap.get("id");

        if (!id) {
            this.router.navigate([""]);

            return Promise.reject();
        }

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                const movie = await lastValueFrom(this.movieService.getMovieDetails(id));

                resolve(movie);
            } catch (error: any) {
                this.toasterService.toast(error.status_message, 1);

                this.router.navigate([""]);

                reject();
            }
        });
    }
}
