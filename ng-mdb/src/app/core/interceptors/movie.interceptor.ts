import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";
import { Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { Observable } from "rxjs";


@Injectable()
export class MovieInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiKey = this.store.selectSnapshot<string>((state: IAppState) => state.settings.apiKey);

        if (req.url.includes(environment.moviesAPI) && apiKey) {
            const modifiedReq = req.clone({
                params: req.params.append('api_key', apiKey)
            });

            return next.handle(modifiedReq);
        } else {
            return next.handle(req);
        }
    }
}