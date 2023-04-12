import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from "@pages/settings/settings.component";
import { SettingsFacade } from "@pages/settings/settings.facade";
import { SettingsRoutingModule } from "@pages/settings/settings-routing.module";

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
