import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { IAppState } from './core/store/IAppState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
