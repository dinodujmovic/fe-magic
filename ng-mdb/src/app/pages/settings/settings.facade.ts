import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { ToasterService } from "@core/modules/toaster/toaster.service";
import { SettingsPayload, UpdateSettings } from "@store/settings/settings.action";
import { SettingsStateModel } from "@store/settings/settings.state";
import { take } from "rxjs";

@Injectable()
export class SettingsFacade {
    constructor(private store: Store, private toasterService: ToasterService) {
    }

    getSettings(): SettingsStateModel {
        return this.store.selectSnapshot<SettingsStateModel>((state: IAppState) => state.settings);
    }

    updateSettings(settings: SettingsPayload) {
        this.store.dispatch(new UpdateSettings(settings))
            .pipe(take(1))
            .subscribe(() => {
                this.toasterService.growl("Settings updated successfully", 3);
            });
    }
}
