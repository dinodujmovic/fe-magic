/*
Angular router Preloading Strategy is a feature that allows you to load the lazy-loaded shell before they are
actually needed by the user.
This can help to reduce the loading time and improve the user experience.

By default, Angular uses the NoPreloading strategy, which means that all the lazy-loaded shell
are loaded only when the user navigates to the corresponding route. But with preloading strategy,
 the shell are loaded in the background,
so that they are available immediately when the user navigates to the corresponding route.

Angular provides three preloading strategies:
    - NoPreloading:
    This is the default strategy, which means that no preloading is done, and the shell are loaded
    only when the user navigates to the corresponding route.

    - PreloadAllModules:
    This strategy preloads all the lazy-loaded shell as soon as the application is loaded.
    This can cause the initial load time of the application to be longer, but it ensures that all the shell are
    available immediately when the user navigates to the corresponding route.

    - Custom Preloading:
    This strategy allows you to define your own preloading logic, where you can choose which shell to
    preload and when to preload them.

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/

import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class PreloadModulesStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data.preload) {
            // eslint-disable-next-line no-console
            console.log(`Preloaded: ${route.path}`);

            return load();
        }
        return of(null);
    }
}
