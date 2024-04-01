import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadComponent: () =>
      import('./series/search/search-container.component').then(
        (m) => m.SearchContainerComponent
      ),
  },
  // All empty paths should redirect to the search page
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
  // All other paths should redirect to the search page too
  {
    path: '**',
    redirectTo: 'search',
  },
];
