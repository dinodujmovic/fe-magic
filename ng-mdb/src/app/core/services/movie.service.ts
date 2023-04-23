import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    IErrorResponse, IMoveDetailsResponse, IMovieResponse, IPaginationResponse
} from "@core/models";
import { TTime } from "@core/models/types/TTime";
import { environment } from "@environment/environment";
import {
    catchError, map, Observable, throwError
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
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getPopularMovies(): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/popular", { language: "en-US", region: "us" });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getNowPlayingMovies(): Observable<IPaginationResponse<IMovieResponse[]>> {
        const url = wrapAPI("movie/now_playing", { language: "en-US", region: "us" });

        return this.http.get<IPaginationResponse<IMovieResponse[]>>(url).pipe(
            map(this.mapPosterPath),
            catchError(this.handleError)
        );
    }

    getMovieDetails(id: string): Observable<IMoveDetailsResponse> {
        const url = wrapAPI(`movie/${id}`);

        return this.http.get<IMoveDetailsResponse>(url).pipe(
            map((m) => {
                const movie = {
                    ...m,
                    backdrop_path: `${environment.assetsAPI}/w1920_and_h800_multi_faces/${m.poster_path}`,
                    poster_path: `${environment.assetsAPI}/w400/${m.poster_path}`,
                };

                return movie;
            }),
            catchError(this.handleError)
        );
    }

    private mapPosterPath(response: IPaginationResponse<IMovieResponse[]>): IPaginationResponse<IMovieResponse[]> {
        if ("results" in response) {
            const results = response.results.map((movie: IMovieResponse) => ({
                ...movie,
                title: movie.title || movie.name,
                poster_path: `${environment.assetsAPI}/w300/${movie.poster_path}`,
            }));

            return {
                ...response,
                results
            };
        }
        return response;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const apiError = error.error as IErrorResponse;

        return throwError(() => apiError);
    }
}
