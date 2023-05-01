import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SettingsFacade } from "./settings.facade";

@Component({
    templateUrl: "./settings.component.html"
})
export class SettingsComponent {
    form: FormGroup;
    themes: string[];
    showApiKey = false;

    constructor(private fb: FormBuilder, private settingsFacade: SettingsFacade) {
        const settings = this.settingsFacade.getSettings();

        this.themes = settings.themes;

        this.form = this.fb.group({
            apiKey: [settings.apiKey, Validators.required],
            theme: [settings.theme, Validators.required],
        });
    }

    onSubmit() {
        this.settingsFacade.updateSettings({
            apiKey: this.form.value.apiKey,
            theme: this.form.value.theme
        });
    }
}
