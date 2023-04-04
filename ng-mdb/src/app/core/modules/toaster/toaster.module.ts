import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToasterComponent } from './toaster.component';
import { ToasterService } from './toaster.service';
import { EnsureModuleLoadedOnceGuard } from '../../guards/ensure-module-loaded-once.guard';

@NgModule({
  imports: [CommonModule],
  exports: [ToasterComponent],
  providers: [ToasterService],
  declarations: [ToasterComponent]
})
export class ToasterModule extends EnsureModuleLoadedOnceGuard {    // Ensure that GrowlerModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: ToasterModule) {
    super(parentModule);
  }
}
