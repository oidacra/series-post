import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Serie } from '../shared/models';

export const SeriesEvents = eventGroup({
  source: 'Series',
  events: {
    // Search Input
    queryChanged: type<{ query: string }>(),
  },
});

export const SeriesApiEvents = eventGroup({
  source: 'Series Api',
  events: {
    // Successful retrieve of data
    loadedSuccess: type<Serie[]>(),
    // Failed retrieve of data
    loadedFailure: type<string>(),
  },
});
