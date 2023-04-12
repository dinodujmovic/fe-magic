import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EnsureModuleLoadedOnceGuard } from "@core/guards/ensure-module-loaded-once.guard";
import { MovieInterceptor } from "@core/interceptors/movie.interceptor";
import { FooterComponent } from "@core/layout/footer/footer.component";
import { HeaderComponent } from "@core/layout/header/header.component";
import { ToasterModule } from "@core/modules/toaster/toaster.module";
import { PreloadModulesStrategy } from "@core/strategies/preload-modules.strategy";
import { environment } from "@environment/environment";
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";
import { MovieState } from "@store/movies/movies.state";
import { SettingsState } from "@store/settings/settings.state";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        ToasterModule,
        NgxsModule.forRoot([MovieState, SettingsState], {
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
        HeaderComponent,
        FooterComponent,
        ToasterModule
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
