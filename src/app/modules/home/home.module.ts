import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home-routing.module';

import { VintageTelevisionComponent } from './pages/vintage-television/vintage-television-component';

@NgModule({
  declarations: [HomeComponent, VintageTelevisionComponent],
  exports: [],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
