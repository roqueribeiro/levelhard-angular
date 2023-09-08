import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../modules/home/home.module').then((x) => x.HomeModule),
    data: { animation: 'Home' },
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('../../modules/kanban/kanban.module').then((x) => x.KanbanModule),
    data: { animation: 'Kanban' },
  },
];
