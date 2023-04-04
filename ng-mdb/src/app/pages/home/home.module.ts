import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from '@pages/home/home-routing.module';
import { HomeFacade } from '@pages/home/home.facade';

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
