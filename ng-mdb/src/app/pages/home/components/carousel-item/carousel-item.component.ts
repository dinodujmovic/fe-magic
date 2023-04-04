import { Component } from '@angular/core';

@Component({
  selector: 'mdb-carousel-item',
  template: `
    <div class="carousel-item flex-col w-48 p-1 relative">
      <ng-content></ng-content>
    </div>
  `
})
export class CarouselItemComponent {

}
