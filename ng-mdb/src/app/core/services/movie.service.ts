import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    IErrorResponse, IMovieDetailsResponse, IMovieResponse, IPaginationResponse
} from "@core/models";
import { TTime } from "@core/models/types/TTime";
import { environment } from "@environment/environment";
import {
    catchError, map, Observable, throwError
} from "rxjs";

const imgBackfall = "/assets/no-image.png";
const wrapAPI = (url: string, params?: any) => {
    const newUrl = new URL(`${environment.moviesAPI}/${url}`);

    if (params) {
        Object.entries(params).forEach(([key, value]: any) => {
            newUrl.searchParams.append(key, value);
        });
    }

    return newUrl.toString();
};

const mapBackdropAndPosterPath = (movie: IMovieResponse | IMovieDetailsResponse) => ({
    backdrop_path: movie.backdrop_path
        ? `${environment.assetsAPI}/original/${movie.backdrop_path}` : imgBackfall,
    poster_path: movie.poster_path ? `${environment.assetsAPI}/w300/${movie.poster_path}` : imgBackfall,
});

@Injectable({
    providedIn: "root"
})
export class MovieService {
    constructor(private http: HttpClient) {
    }

    searchMovies(query: string): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("search/movie", {
            query, language: "en-US", region: "us", include_adult: false
        });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url)
            .pipe(catchError(this.handleError));
    }

    getTrendingMovies(time: TTime = "day"): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI(`trending/all/${time}`, { language: "en-US", region: "us" });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapMoviesPosterAndBackdropPaths),
            catchError(this.handleError)
        );
    }

    getPopularMovies(page = 1): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/popular", { language: "en-US", region: "us", page });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapMoviesPosterAndBackdropPaths),
            catchError(this.handleError)
        );
    }

    getNowPlayingMovies(page = 1): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/now_playing", { language: "en-US", region: "us", page });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapMoviesPosterAndBackdropPaths),
            catchError(this.handleError)
        );
    }

    getUpcomingMovies(page = 1) :Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/upcoming", { language: "en-US", region: "us", page });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapMoviesPosterAndBackdropPaths),
            catchError(this.handleError)
        );
    }

    getMovieDetails(id: string): Observable<IMovieDetailsResponse> {
        const url = wrapAPI(`movie/${id}`);

        return this.http.get<IMovieDetailsResponse>(url).pipe(
            map((movie) => ({
                ...movie,
                ...mapBackdropAndPosterPath(movie)
            })),
            catchError(this.handleError)
        );
    }

    private mapMoviesPosterAndBackdropPaths(response: IPaginationResponse<IMovieResponse[]>): IPaginationResponse<IMovieResponse[]> {
        const results = response.results.map((movie: IMovieResponse) => ({
            ...movie,
            title: movie.title || movie.name,
            ...mapBackdropAndPosterPath(movie)
        }));

        return {
            ...response,
            results
        };
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const apiError = error.error as IErrorResponse;

        return throwError(() => apiError);
    }
}
