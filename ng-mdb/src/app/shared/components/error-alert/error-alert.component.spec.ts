import { ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { ErrorAlertComponent } from "./error-alert.component";

const ERROR = "This is error alert";
describe("ErrorAlertComponent", () => {
    let component: ErrorAlertComponent;
    let fixture: ComponentFixture<ErrorAlertComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorAlertComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorAlertComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not be rendered", () => {
        fixture.detectChanges();

        const errorAlertEl = fixture.debugElement.query(By.css(".mdb-error-alert"));
        expect(errorAlertEl).toBeNull();
    });

    it("should have correct error message", () => {
        component.error = ERROR;
        fixture.detectChanges();

        const errorAlertEl = fixture.debugElement.query(By.css(".mdb-error-alert")).nativeElement;
        expect(errorAlertEl.textContent.trim()).toEqual(ERROR);
    });
});
