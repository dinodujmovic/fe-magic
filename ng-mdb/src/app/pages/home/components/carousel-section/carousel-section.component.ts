import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-carousel-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
      <h1 class="text-xl font-bold mb-2">{{ title }}</h1>

      <ng-content select="[data-carousel-section-loading]"></ng-content>

      <ng-content select="[data-carousel-section-error]"></ng-content>

      <div class="carousel carousel-end rounded-box relative">
          <ng-content select="[data-carousel-section-items]"></ng-content>
      </div>
  </div>
  `
})
export class CarouselSectionComponent {
  @Input() title = ''
}
