import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MovieInterceptor } from "@core/interceptors/movie.interceptor";
import { environment } from "@environment/environment";
import { Store } from "@ngxs/store";

describe("MovieInterceptor", () => {
    let httpTestingController: HttpTestingController;
    let clientMock: HttpClient;
    let mockStore: jasmine.SpyObj<Store>;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj(
            [
                "selectSnapshot",
            ]
        );

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MovieInterceptor,
                    multi: true
                },
                { provide: Store, useValue: mockStore }
            ],
            imports: [
                HttpClientTestingModule,
            ]
        });

        clientMock = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should add api key to request params when calling moviesAPI", () => {
        mockStore.selectSnapshot.and.returnValue("testApiKey");

        const url = `${environment.moviesAPI}/movies`;
        // Use HttpClientTesting to trigger HTTP call
        clientMock.get(url).subscribe();

        const httpReq = httpTestingController.expectOne(`${url}?api_key=testApiKey`);
        expect(httpReq.request.url).toEqual(`${environment.moviesAPI}/movies`);
        expect(httpReq.request.params.get("api_key")).toEqual("testApiKey");
    });

    it("should not add api key to request params when calling non-moviesAPI", () => {
        const url = "something.com/data";
        // Use HttpClientTesting to trigger HTTP call
        clientMock.get(url).subscribe();

        const httpReq = httpTestingController.expectOne(url);
        expect(httpReq.request.url).toEqual(url);
        expect(httpReq.request.params.has("api_key")).toBeFalsy();
    });
});
