import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    IApiResponse, IErrorResponse, IMoveDetailsResponse, IMovieResponse
} from "@core/models";
import { TTime } from "@core/models/types/TTime";
import { environment } from "@environment/environment";
import {
    catchError, map, Observable, of
} from "rxjs";

const wrapAPI = (url: string, params?: any) => {
    const newUrl = new URL(`${environment.moviesAPI}/${url}`);

    if (params) {
        Object.entries(params).forEach(([key, value]: any) => {
            newUrl.searchParams.append(key, value);
        });
    }

    return newUrl.toString();
};

@Injectable({
    providedIn: "root"
})
export class MovieService {
    constructor(private http: HttpClient) {
    }

    searchMovies(query: string): Observable<IApiResponse<IMovieResponse[]>> {
        const url = wrapAPI("search/movie", {
            query, language: "en-US", region: "us", include_adult: false
        });

        return this.http.get<IApiResponse<IMovieResponse[]>>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    getTrendingMovies(time: TTime = "day"): Observable<IApiResponse<IMovieResponse[]>> {
        const url = wrapAPI(`trending/all/${time}`, { language: "en-US", region: "us" });

        return this.http.get<IApiResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getPopularMovies(): Observable<IApiResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/popular", { language: "en-US", region: "us" });

        return this.http.get<IApiResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getNowPlayingMovies(): Observable<IApiResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/now_playing", { language: "en-US", region: "us" });

        return this.http.get<IApiResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getMovieDetails(id: string): Observable<IMoveDetailsResponse | IErrorResponse> {
        const url = wrapAPI(`movie/${id}`);

        return this.http.get<IMoveDetailsResponse>(url).pipe(
            catchError(this.handleError)
        );
    }

    private mapPosterPath(response: IApiResponse<IMovieResponse[]>): IApiResponse<IMovieResponse[]> {
        if ("results" in response) {
            const results = response.results.map((movie: IMovieResponse) => ({
                ...movie,
                title: movie.title || movie.name,
                poster_path: `${environment.assetsAPI}/w300/${movie.poster_path}`
            }));

            return {
                ...response,
                results
            };
        }
        return response;
    }

    private handleError(error: HttpErrorResponse): Observable<IErrorResponse> {
        const apiError = error.error as IErrorResponse;

        return of(apiError);
    }
}
