import { SettingsPayload } from "@store/settings/settings.model";

export class UpdateSettings {
    static type = "[Settings] Update settings";
    constructor(public settings: SettingsPayload) { }
}
