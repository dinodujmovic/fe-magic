import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { LoadingComponent } from './components/loading/loading.component';

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
