import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./series/series-shell.component').then(
        m => m.SeriesShellComponent
      ),
  },
];
