import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EnsureModuleLoadedOnceGuard } from "@core/guards/ensure-module-loaded-once.guard";
import { ToasterComponent } from "@core/shell/toaster/toaster.component";
import { ToasterService } from "@core/shell/toaster/toaster.service";

@NgModule({
    imports: [CommonModule],
    exports: [ToasterComponent],
    providers: [ToasterService],
    declarations: [ToasterComponent]
})
export class ToasterModule extends EnsureModuleLoadedOnceGuard { // Ensure that GrowlerModule is only loaded into AppModule
    // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
    constructor(@Optional() @SkipSelf() parentModule: ToasterModule) {
        super(parentModule);
    }
}
