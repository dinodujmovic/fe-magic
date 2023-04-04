import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeFacade } from './home.facade';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ...HomeRoutingModule.components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    HomeFacade
  ]
})
export class HomeModule { }
