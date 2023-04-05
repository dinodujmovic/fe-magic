import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from '@pages/settings/settings.component';
import { SettingsRoutingModule } from '@pages/settings/settings-routing.module';
import { SettingsFacade } from '@pages/settings/settings.facade';


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
