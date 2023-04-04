import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="hero mb-10" style="background-image: url({{background}});">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content h-96">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold text-white">{{ title }}</h1>
            <p class="mb-5 text-white">
                <ng-content></ng-content>
            </p>
        </div>
    </div>
</div>
  `
})
export class HeroComponent {
  @Input() title = ''
  @Input() background = '';
}
