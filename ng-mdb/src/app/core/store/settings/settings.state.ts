import { Injectable } from "@angular/core";
import { State, Action, StateContext } from '@ngxs/store';
import { UpdateSettings } from "@store/settings/settings.action";

export interface SettingsStateModel {
    themes: string[];
    theme: string;
    apiKey: string;
}

@State<SettingsStateModel>({
    name: 'settings',
    defaults: {
        themes: ["winter", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate"],
        theme: "winter",
        apiKey: ""
    }
})

@Injectable()
export class SettingsState {
    @Action(UpdateSettings)
    updateSettings(ctx: StateContext<SettingsStateModel>, action: UpdateSettings) {
        console.log(action.settings);

        ctx.patchState({
            ...action.settings
        });

        console.log(ctx.getState())
    }
}