import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MovieInterceptor } from "@core/interceptors/movie.interceptor";
import { Store } from "@ngxs/store";
import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";

describe("MovieInterceptor", () => {
    let httpTestingController: HttpTestingController;
    let clientMock: HttpClient;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MovieInterceptor,
                    multi: true
                },
                // If we don't want to use spy
                // { provide: Store, useValue: { selectSnapshot: () => "testApiKey" } }
            ],
            imports: [
                HttpClientTestingModule,
            ]
        });

        store = TestBed.inject(Store);
        clientMock = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should add api key to request params when calling moviesAPI", () => {
        spyOn(store, "selectSnapshot").and.returnValue("testApiKey"); // same here

        const url = `${environment.moviesAPI}/movies`;

        clientMock.get(url).subscribe();

        const httpReq = httpTestingController.expectOne(`${url}?api_key=testApiKey`);
        expect(httpReq.request.url).toEqual(`${environment.moviesAPI}/movies`);
        expect(httpReq.request.params.get("api_key")).toEqual("testApiKey");
    });

    it("should not add api key to request params when calling non-moviesAPI", () => {
        const url = "something.com/data";

        clientMock.get(url).subscribe();

        const httpReq = httpTestingController.expectOne(url);
        expect(httpReq.request.url).toEqual(url);
        expect(httpReq.request.params.has("api_key")).toBeFalsy();
    });
});
