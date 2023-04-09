import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "mdb-carousel-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="mdb-carousel-item carousel-item flex-col w-48 p-1 relative">
            <ng-content></ng-content>
        </div>
    `
})
export class CarouselItemComponent {
}
