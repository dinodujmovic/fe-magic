import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NOW_PLAYING_MOVIES_STATE_MODEL_MOCK } from "@mocks/NowPlayingMoviesStateModelMock";
import { TRENDING_MOVIES_STATE_MODEL_MOCK } from "@mocks/TrendingMoviesStateModelMock";
import { CarouselItemComponent } from "@pages/movies/components/carousel-item/carousel-item.component";
import { CarouselSectionComponent } from "@pages/movies/components/carousel-section/carousel-section.component";
import { MovieCardComponent } from "@pages/movies/components/movie-card/movie-card.component";
import { MoviesFacade } from "@pages/movies/movies.facade";
import { SharedModule } from "@shared/shared.module";
import { of } from "rxjs";

import { MoviesComponent } from "./movies.component";

describe("MoviesComponent", () => {
    let component: MoviesComponent;
    let fixture: ComponentFixture<MoviesComponent>;
    let mockMoviesFacade: jasmine.SpyObj<MoviesFacade>;

    beforeEach(async () => {
        mockMoviesFacade = jasmine.createSpyObj(
            [
                "getTrendingMovies$",
                "getNowPlayingMovies$",
                "loadHomePage",
                "loadTrendingMovies"
            ]
        );

        await TestBed.configureTestingModule({
            imports: [
                SharedModule,
            ],
            declarations: [
                MoviesComponent,
                CarouselSectionComponent,
                CarouselItemComponent,
                MovieCardComponent
            ],
            providers: [
                { provide: MoviesFacade, useValue: mockMoviesFacade }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it("should create", () => {
        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it("should popular and trending render movies", () => {
        mockMoviesFacade.getTrendingMovies$.and.returnValue(of(TRENDING_MOVIES_STATE_MODEL_MOCK));
        mockMoviesFacade.getNowPlayingMovies$.and.returnValue(of(NOW_PLAYING_MOVIES_STATE_MODEL_MOCK));

        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(mockMoviesFacade.loadHomePage).toHaveBeenCalledTimes(1);
        expect(mockMoviesFacade.getTrendingMovies$).toHaveBeenCalledTimes(1);
        expect(mockMoviesFacade.getNowPlayingMovies$).toHaveBeenCalledTimes(1);

        const trendingMoviesEl = fixture.debugElement.queryAll(By.css(".mdb-trending-movies .mdb-movie-card"));
        expect(trendingMoviesEl.length).toEqual(2);
        expect(trendingMoviesEl[0].query(By.css(".mdb-movie-card__title")).nativeElement.textContent).toEqual("Avatar");
        expect(trendingMoviesEl[1].query(By.css(".mdb-movie-card__title")).nativeElement.textContent).toEqual("John Wick 4");

        const playingMovies = fixture.debugElement.queryAll(By.css(".mdb-playing-movies .mdb-movie-card"));
        expect(playingMovies.length).toEqual(3);
        expect(playingMovies[0].query(By.css(".mdb-movie-card__title")).nativeElement.textContent).toEqual("John Wick 2");
        expect(playingMovies[1].query(By.css(".mdb-movie-card__title")).nativeElement.textContent).toEqual("Lord of the rings");
        expect(playingMovies[2].query(By.css(".mdb-movie-card__title")).nativeElement.textContent).toEqual("Harry Potter");
    });
});
