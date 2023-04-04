import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div *ngIf="loading">Loading...</div>
  `,
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
