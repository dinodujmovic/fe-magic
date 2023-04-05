import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "@shared/components/loading/loading.component";
import { ErrorAlertComponent } from "@shared/components/error-alert/error-alert.component";
import { HeroComponent } from "@shared/components/hero/hero.component";

const components = [HeroComponent, LoadingComponent, ErrorAlertComponent];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class SharedModule { }
