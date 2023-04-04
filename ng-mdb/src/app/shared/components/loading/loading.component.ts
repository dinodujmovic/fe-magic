import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ng-container *ngIf="loading">Loading...</ng-container>
  `,
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
