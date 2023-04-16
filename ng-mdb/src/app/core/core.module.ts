import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EnsureModuleLoadedOnceGuard } from "@core/guards/ensure-module-loaded-once.guard";
import { MovieInterceptor } from "@core/interceptors/movie.interceptor";
import { LayoutModule } from "@core/shell/layout/layout.module";
import { ToasterModule } from "@core/shell/toaster/toaster.module";
import { PreloadModulesStrategy } from "@core/strategies/preload-modules.strategy";
import { environment } from "@environment/environment";
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";
import { HomeState } from "@store/home/home.state";
import { SettingsState } from "@store/settings/settings.state";

@NgModule({
    imports: [
        LayoutModule,
        ToasterModule,
        HttpClientModule,
        NgxsModule.forRoot([HomeState, SettingsState], {
            developmentMode: !environment.production
        }),
        NgxsStoragePluginModule.forRoot({
            key: [
                {
                    key: SettingsState,
                    engine: LOCAL_STORAGE_ENGINE
                },
            ]
        }),
        ...environment.plugins
    ],
    exports: [
        LayoutModule,
        ToasterModule,
    ],
    providers: [
        PreloadModulesStrategy,
        { provide: HTTP_INTERCEPTORS, useClass: MovieInterceptor, multi: true }
    ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
