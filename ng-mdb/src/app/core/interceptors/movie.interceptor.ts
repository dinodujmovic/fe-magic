import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IAppState } from "../store/IAppState";

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