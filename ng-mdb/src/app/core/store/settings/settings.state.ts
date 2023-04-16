import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { UpdateSettings } from "@store/settings/settings.action";

export interface ISettingsState {
    themes: string[];
    theme: string;
    apiKey: string;
}

@State<ISettingsState>({
    name: "settings",
    defaults: {
        themes: ["winter", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate"],
        theme: "winter",
        apiKey: ""
    }
})

@Injectable()
export class SettingsState {
    @Action(UpdateSettings)
    updateSettings(ctx: StateContext<ISettingsState>, action: UpdateSettings) {
        ctx.patchState({
            ...action.settings
        });
    }
}
