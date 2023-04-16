import { IHomeState } from "@store/home/home.state";
import { ISettingsState } from "@store/settings/settings.state";

export interface IAppState {
    home: IHomeState
    settings: ISettingsState
}
