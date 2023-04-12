import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { LoadingComponent } from "./loading.component";

describe("LoadingComponent", () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not be rendered", () => {
        fixture.detectChanges();

        const errorAlertEl = fixture.debugElement.query(By.css(".mdb-loading"));
        expect(errorAlertEl).toBeNull();
    });

    it("should show loading message", () => {
        component.loading = true;
        fixture.detectChanges();

        const errorAlertEl = fixture.debugElement.query(By.css(".mdb-loading")).nativeElement;
        expect(errorAlertEl.textContent.trim()).toEqual("Loading...");
    });
});
