import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const apiKey = 'YOUR_API_KEY_HERE';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) {
        console.log(environment);
     }

    getTopRatedMovies(): Observable<any> {
        const url = `${environment.moviesAPI}/discover/movie?sort_by=vote_average.desc&api_key=${environment.apiKey}`;

        return this.http.get<ApiResponse>(url).pipe(
            map(response => response.results)
        );
    }
}

interface ApiResponse {
    results: Movie[];
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}