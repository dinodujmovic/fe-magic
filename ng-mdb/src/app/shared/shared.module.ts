import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ErrorAlertComponent } from "@shared/components/error-alert/error-alert.component";
import { HeroComponent } from "@shared/components/hero/hero.component";
import { LoadingComponent } from "@shared/components/loading/loading.component";
import { RuntimePipe } from "@shared/pipes/runtime.pipe";

const components = [HeroComponent, LoadingComponent, ErrorAlertComponent, RuntimePipe];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ],
    providers: [
        RuntimePipe
    ]
})
export class SharedModule { }
