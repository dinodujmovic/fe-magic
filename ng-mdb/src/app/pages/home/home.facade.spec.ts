import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { HomeFacade } from "@pages/home/home.facade";
import { GetNowPlayingMovies, GetTrendingMovies } from "@store/home/home.action";

describe("HomeFacade", () => {
    let service: HomeFacade;
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
                HomeFacade,
                { provide: Store, useValue: mockStore }
            ]
        });

        service = TestBed.inject(HomeFacade);
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
