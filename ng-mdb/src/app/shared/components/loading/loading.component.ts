import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'mdb-loading',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div *ngIf="loading">\
        <div>Loading...</div>
        <progress class="progress w-56"></progress>
      </div>
  `,
})
export class LoadingComponent {
    @Input() loading = false;
}
