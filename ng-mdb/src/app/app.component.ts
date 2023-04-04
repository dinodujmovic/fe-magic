import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { IAppState } from '@core/store/IAppState';

@Component({
  selector: 'app-root',
  template: `
    <mdb-header></mdb-header>

    <router-outlet></router-outlet>
    
    <mdb-footer class="mt-auto"></mdb-footer>
    <mdb-toaster></mdb-toaster>
    <mdb-modal></mdb-modal>
`,
})
export class AppComponent {
  title = 'ng-mdb';

  @Select((state: IAppState) => state.settings.theme) private theme$!: Observable<string>;

  constructor() {
    this.theme$.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme)
    })
  }
}
