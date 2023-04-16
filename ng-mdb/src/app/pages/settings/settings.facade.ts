import { Injectable } from "@angular/core";
import { ToasterService } from "@core/shell/toaster/toaster.service";
import { Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { SettingsPayload, UpdateSettings } from "@store/settings/settings.action";
import { ISettingsState } from "@store/settings/settings.state";
import { take } from "rxjs";

@Injectable()
export class SettingsFacade {
    constructor(private store: Store, private toasterService: ToasterService) {
    }

    getSettings(): ISettingsState {
        return this.store.selectSnapshot<ISettingsState>((state: IAppState) => state.settings);
    }

    updateSettings(settings: SettingsPayload) {
        this.store.dispatch(new UpdateSettings(settings))
            .pipe(take(1))
            .subscribe(() => {
                this.toasterService.toast("Settings updated successfully", 3);
            });
    }
}
