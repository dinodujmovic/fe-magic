import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/*
  Movie Card Component 
  Shared across multiple modules like HomeModule, MovieModule.
*/
@Component({
  selector: 'mdb-movie-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="mdb-movie-card">
        <div class="relative">
            <img class="rounded-md" [src]="poster">

            <div class="radial-progress bg-black border-black black border-4 absolute -bottom-4 left-2" [ngClass]="{ 
                'text-red-500':rating < 3,
                'text-yellow-300': rating >= 4 && rating  < 7,
                'text-green-400': rating >= 7}" style="--value:{{rating * 10}};--size:40px; --thickness: 4px;">
                {{ rating | number:'1.1-1' }}
            </div>
        </div>

        <div class="p-1 font-bold mt-5">{{ title }}</div>
        <div class="p-1 text-gray-500">{{ date | date:'dd MMMM yyyy' }}</div>
    </div>
  `
})
export class MovieCardComponent {
  @Input() title!: string;
  @Input() poster!: string;
  @Input() rating!: number;
  @Input() date: string = '';
}
