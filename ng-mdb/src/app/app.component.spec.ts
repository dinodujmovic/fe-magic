import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "@core/core.module";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CoreModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    it("page should have default data-theme set to winter", () => {
        expect(document.documentElement.getAttribute("data-theme")).toEqual("winter");
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it("should render header, footer and toaster", () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("mdb-header")).toBeTruthy();
        expect(compiled.querySelector("router-outlet")).toBeTruthy();
        expect(compiled.querySelector("mdb-footer")).toBeTruthy();
        expect(compiled.querySelector("mdb-toaster")).toBeTruthy();
    });
});
