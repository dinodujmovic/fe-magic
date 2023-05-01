export interface SettingsPayload {
    apiKey: string
    theme: string;
}

export interface ISettingsState {
    themes: string[];
    theme: string;
    apiKey: string;
}
