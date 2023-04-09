import { TestBed } from "@angular/core/testing";
import { MoviesFacade } from "@pages/movies/movies.facade";
import { NgxsModule, Store } from "@ngxs/store";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/movies/movies.action";

describe("MovieFacade", () => {
    let service: MoviesFacade;
    let mockStore: jasmine.SpyObj<Store>;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj(
            [
                "dispatch",
                "select"
            ]
        );

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot()],
            providers: [
                MoviesFacade,
                { provide: Store, useValue: mockStore }
            ]
        });

        service = TestBed.inject(MoviesFacade);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("loadHomePage should dispatch correct actions", () => {
        service.loadHomePage();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
        expect(mockStore.dispatch).toHaveBeenCalledWith(new GetNowPlayingMovies());
        expect(mockStore.dispatch).toHaveBeenCalledWith(new GetTrendingMovies());
    });

    it("loadTrendingMovies should dispatch correct actions", () => {
        service.loadTrendingMovies("day");
        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toHaveBeenCalledWith(new GetTrendingMovies("day"));
    });
});
