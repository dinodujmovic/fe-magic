import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { IAppState } from "src/app/core/store/IAppState";
import { SettingsPayload, UpdateSettings } from "src/app/core/store/settings/settings.action";
import { SettingsStateModel } from "src/app/core/store/settings/settings.state";

@Injectable()
export class SettingsFacade {
    constructor(private store: Store) {
    }

    getSettings(): SettingsStateModel{
        return this.store.selectSnapshot<SettingsStateModel>((state: IAppState) => state.settings)
    }

    updateSettings(settings: SettingsPayload) {
        this.store.dispatch(new UpdateSettings(settings))
    }
}