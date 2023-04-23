import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "mdb-hero",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="mdb-hero hero mb-10 " [style.background-image]="'url(' + background + ')'">
            <div class="hero-overlay bg-opacity-70"></div>
            <div class="mdb-hero__content w-full flex-col max-w-none hero-content text-white"
                 [style.height]="height + 'px'">
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class HeroComponent {
    @Input() title = "";
    @Input() background = "";
    @Input() height = 100;
}
