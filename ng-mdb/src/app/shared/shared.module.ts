import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '@shared/components/movie-card/movie-card.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ErrorAlertComponent } from '@shared/components/error-alert/error-alert.component';

const components = [MovieCardComponent, LoadingComponent, ErrorAlertComponent]

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
