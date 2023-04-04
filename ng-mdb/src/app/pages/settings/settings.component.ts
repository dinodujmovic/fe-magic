import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SettingsFacade } from './settings.facade';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form: FormGroup;
  themes: string[];

  constructor(private fb: FormBuilder, private settingsFacade: SettingsFacade) {
    let settings = this.settingsFacade.getSettings()

    this.themes = settings.themes;

    this.form = this.fb.group({
      apiKey: [settings.apiKey, Validators.required],
      theme: [settings.theme, Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.settingsFacade.updateSettings({
      apiKey: this.form.value.apiKey,
      theme: this.form.value.theme
    });
  }
}
