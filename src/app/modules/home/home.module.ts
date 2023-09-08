import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  exports: [],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
