import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { PreloadModulesStrategy } from './strategies/preload-modules.strategy';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { HeaderComponent } from './layout/header/header.component';
import { ToasterModule } from './modules/toaster/toaster.module';
import { ModalModule } from './modules/modal/modal.module';
import { FooterComponent } from './layout/footer/footer.component';
import { environment } from '../../environments/environment';
import { MovieState } from './store/movies/movies.state';
import { SettingsState } from './store/settings/settings.state';
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { MovieInterceptor } from './interceptors/movie.interceptor';

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
    ModalModule,
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
    ModalModule,
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
}{ }
