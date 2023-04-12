import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IApiResponse, IMovieResponse } from "@core/models";
import { TTime } from "@core/models/types/TTime";
import { environment } from "@environment/environment";

import { MovieService } from "./movie.service";

describe("MovieService", () => {
    let service: MovieService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MovieService]
        });

        service = TestBed.inject(MovieService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("Should return movies with correct poster path", () => {
        const result = {
            id: 1, title: "Movie 1", name: "Movie 1", poster_path: "image.jpg", overview: "", release_date: "", vote_average: 1
        };
        const mockResponse: IApiResponse<IMovieResponse[]> = {
            results: [
                result
            ],
            total_pages: 1,
            total_results: 1,
            page: 1
        };

        service.getTrendingMovies().subscribe((response) => {
            const expectedResponse: IApiResponse<IMovieResponse[]> = {
                results: [{
                    ...result,
                    poster_path: `${environment.assetsAPI}/w300/image.jpg`
                }],
                total_pages: 1,
                total_results: 1,
                page: 1
            };

            expect(response).toEqual(expectedResponse);
        });

        const req = httpTestingController.expectOne(`${environment.moviesAPI}/trending/all/day?language=en-US&region=us`);
        expect(req.request.method).toEqual("GET");
        req.flush(mockResponse);
    });

    describe("getTrendingMovies", () => {
        const getUrl = (time: TTime) => `${environment.moviesAPI}/trending/all/${time}?language=en-US&region=us`;

        it("should call get with correct URL (time: day)", () => {
            const time: TTime = "day";
            const url = getUrl(time);

            service.getTrendingMovies(time).subscribe();

            const request = httpTestingController.expectOne(url);
            expect(request.request.method).toBe("GET");
        });

        it("should call get with correct URL (time: week)", () => {
            const time: TTime = "week";
            const url = getUrl(time);

            service.getTrendingMovies(time).subscribe();

            const request = httpTestingController.expectOne(url);
            expect(request.request.method).toBe("GET");
        });
    });

    describe("getNowPlayingMovies", () => {
        it("should call get with correct URL", () => {
            const url = `${environment.moviesAPI}/movie/now_playing?language=en-US&region=us`;

            service.getNowPlayingMovies().subscribe();

            const request = httpTestingController.expectOne(url);
            expect(request.request.method).toBe("GET");
        });
    });

    describe("getMovieDetails", () => {
        it("should call get with correct URL", () => {
            const id = "1";
            const url = `${environment.moviesAPI}/movie/${id}`;

            service.getMovieDetails(id).subscribe();

            const request = httpTestingController.expectOne(url);
            expect(request.request.method).toBe("GET");
        });
    });
});
