import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { HeroComponent } from "./hero.component";

@Component({
    template: `
        <mdb-hero [title]="title" [background]="background">
            Some content
        </mdb-hero>
    `
})
export class ContentProjectionTesterComponent {
    @Input() title = "";
    @Input() background = "";
}
describe("HeroComponent", () => {
    let component: ContentProjectionTesterComponent;
    let fixture: ComponentFixture<ContentProjectionTesterComponent>;

    const TITLE = "Welcome";
    const IMAGE_URL = "image.jpg";

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeroComponent, ContentProjectionTesterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ContentProjectionTesterComponent);
        component = fixture.componentInstance;
        component.background = IMAGE_URL;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should pass correct url", () => {
        const heroEl = fixture.debugElement.query(By.css(".mdb-hero")).nativeElement;
        const heroContentEl = fixture.debugElement.query(By.css(".mdb-hero__content")).nativeElement;

        expect(heroEl.style.backgroundImage).toEqual(`url("${IMAGE_URL}")`);
        expect(heroContentEl.textContent.trim()).toEqual("Some content");
    });
});
