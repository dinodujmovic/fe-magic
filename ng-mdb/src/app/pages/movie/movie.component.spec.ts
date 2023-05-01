import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "@shared/shared.module";

import { MovieComponent } from "./movie.component";

describe("MovieComponent", () => {
    let component: MovieComponent;
    let fixture: ComponentFixture<MovieComponent>;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockActivatedRoute = {
            snapshot: {
                data: {
                    resolvedMovie: {}
                }
            },
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [MovieComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MovieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
