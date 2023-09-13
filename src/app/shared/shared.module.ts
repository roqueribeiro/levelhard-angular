import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { PreloaderComponent } from './components/preloader/preloader-component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [PreloaderComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    PreloaderComponent,
  ],
})
export class SharedModule {}
