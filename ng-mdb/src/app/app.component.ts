import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { IAppState } from "@core/store/IAppState";

@Component({
    selector: "mdb-root",
    template: `
    <mdb-header></mdb-header>

    <router-outlet></router-outlet>

    <mdb-footer class="mt-auto"></mdb-footer>
    <mdb-toaster></mdb-toaster>
`,
})
export class AppComponent {
    title = "ng-mdb";

  @Select((state: IAppState) => state.settings.theme) private theme$!: Observable<string>;

  constructor() {
      this.theme$.subscribe((theme) => {
          document.documentElement.setAttribute("data-theme", theme);
      });
  }
}
