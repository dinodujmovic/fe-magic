import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "mdb-carousel-section",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div class="container mb-10">
      <h1 class="text-xl font-bold mb-2">{{ title }}</h1>

      <ng-content select="[data-carousel-section-content-other]"></ng-content>

      <div class="carousel carousel-end rounded-box relative">
          <ng-content select="[data-carousel-section-content-items]">
          </ng-content>
      </div>
  </div>
  `
})
export class CarouselSectionComponent {
  @Input() title = "";
}
