import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EnsureModuleLoadedOnceGuard } from "@core/guards/ensure-module-loaded-once.guard";
import { FooterComponent } from "@core/shell/layout/footer/footer.component";
import { HeaderComponent } from "@core/shell/layout/header/header.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [HeaderComponent, FooterComponent],
    declarations: [HeaderComponent, FooterComponent]
})
export class LayoutModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
        super(parentModule);
    }
}
