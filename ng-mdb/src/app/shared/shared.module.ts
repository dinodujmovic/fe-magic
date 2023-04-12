import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ErrorAlertComponent } from "@shared/components/error-alert/error-alert.component";
import { HeroComponent } from "@shared/components/hero/hero.component";
import { LoadingComponent } from "@shared/components/loading/loading.component";

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
