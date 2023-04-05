import { Injectable } from "@angular/core";
import { environment } from "@environment/environment";

@Injectable({
    providedIn: "root"
})
export class LoggerService {
    log(msg: string) {
        if (!environment.production) {
            // eslint-disable-next-line no-console
            console.log(msg);
        } else {
            //  Logger service of your choice (example: AppInsights)
        }
    }

    logError(msg: string) {
        if (!environment.production) {
            // eslint-disable-next-line no-console
            console.error(msg);
        } else {
            //  Logger service of your choice (example: AppInsights)
        }
    }
}
