import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsFacade } from "@pages/settings/settings.facade";
import { By } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from "./settings.component";

describe("SettingsComponent", () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let mockSettingsFacade: jasmine.SpyObj<SettingsFacade>;

    beforeEach(async () => {
        mockSettingsFacade = jasmine.createSpyObj(
            [
                "getSettings",
                "updateSettings"
            ]
        );

        await TestBed.configureTestingModule({
            declarations: [SettingsComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: SettingsFacade, useValue: mockSettingsFacade }
            ]
        }).compileComponents();

        mockSettingsFacade.getSettings.and.returnValue({
            themes: ["winter", "business"],
            apiKey: "123",
            theme: "winter"
        });
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should get correct settings", () => {
        const settingsApiKeyInputEl = fixture.debugElement.query(By.css(".mdb-settings .mdb-settings__api-key-input")).nativeElement;
        const settingsThemeSelectEl = fixture.debugElement.query(By.css(".mdb-settings .mdb-settings__theme-select")).nativeElement;

        expect(settingsApiKeyInputEl.value).toEqual("123");
        expect(settingsThemeSelectEl.value).toEqual("winter");
        expect(component.themes).toEqual(["winter", "business"]);
    });
});
