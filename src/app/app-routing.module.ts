import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

import { CONTENT_ROUTES } from './shared/routes/default-layout.routes';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: CONTENT_ROUTES,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
