import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Serie, SerieDetail } from '../shared/models';

/**
 * SeriesEvents
 * 
 * @description
 * Event group for series events.
 * 
 * @property {type<{ query: string }>} queryChanged - Event for when the query changes.
 * @property {type<{ theTvDbId: number }>} seriesSelected - Event for when a series is selected.
 */
export const SeriesEvents = eventGroup({
  source: 'Series',
  events: {
    // Search Input
    queryChanged: type<{ query: string }>(),
    seriesSelected: type<{ theTvDbId: number }>(),
  },
});

/**
 * SeriesApiEvents
 * 
 * @description
 * Event group for series API events.
 * 
 * @property {type<Serie[]>} loadedSuccess - Event for when the data is successfully retrieved.
 * @property {type<string>} loadedFailure - Event for when the data retrieval fails.
 * @property {type<SerieDetail>} detailLoadedSuccess - Event for when the detail data is successfully retrieved.
 * @property {type<string>} detailLoadedFailure - Event for when the detail data retrieval fails.
 */
export const SeriesApiEvents = eventGroup({
  source: 'Series Api',
  events: {
    // Successful retrieve of data
    loadedSuccess: type<Serie[]>(),
    // Failed retrieve of data
    loadedFailure: type<string>(),
    // Successful retrieve of detail data
    detailLoadedSuccess: type<SerieDetail>(),
    // Failed retrieve of detail data
    detailLoadedFailure: type<string>(),
  },
});
