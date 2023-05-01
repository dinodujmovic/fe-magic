import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const mockStore = jasmine.createSpyObj(
        [
            "selectSnapshot",
            "select"
        ]
    );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeaderComponent],
            providers: [
                { provide: Store, useValue: mockStore }
            ]
        }).compileComponents();

        mockStore.select.and.returnValue(new Observable((observer) => {
            observer.next({
                themes: [
                    "winter",
                    "corporate",
                    "light"
                ]
            });
        }));
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have theme select with 3 items", () => {
        const dropdownItems = fixture.debugElement.queryAll(By.css(".mdb-header__theme-select .mdb-header__theme-select-item"));

        expect(dropdownItems.length).toEqual(3);
    });
});
