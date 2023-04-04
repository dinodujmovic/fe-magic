import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsFacade } from './settings.facade';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  providers: [
    SettingsFacade
  ]
})
export class SettingsModule { }
