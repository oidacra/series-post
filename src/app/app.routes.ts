import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./series/series.component').then((m) => m.SeriesComponent),
  },
];
