export interface SettingsPayload {
    apiKey: string
    theme: string;
}

export class UpdateSettings {
    static type = "[Settings] Update settings";
    constructor(public settings: SettingsPayload) { }
}
