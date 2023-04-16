import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot
} from "@angular/router";

const moviesFilterRoutes = ["now-playing", "upcoming", "search"];
const movieIdRegex = /^\d+-[a-zA-Z0-9-]+$/; // 1234-super-mario
const isValidRoute = (route: string) => moviesFilterRoutes.includes(route) || movieIdRegex.test(route);

@Injectable()
export class MoviesGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const { id } = next.params;

        if (!isValidRoute(id)) {
            this.router.navigate(["/movies"]);

            return false;
        }

        return true;
    }
}
