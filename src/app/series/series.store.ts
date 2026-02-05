import { effect, inject } from '@angular/core';
import { mapResponse, tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withState,
  withHooks,
  getState,
} from '@ngrx/signals';
import {
  Events,
  on,
  withEventHandlers,
  withReducer,
} from '@ngrx/signals/events';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { ComponentState, Serie, SerieDetail } from '../shared/models';
import { SeriesEvents, SeriesApiEvents } from './series.events';
import { SeriesService } from './services/series.service';

const DEBOUNCE_TIME_DEFAULT = 300;

// Store state related
export interface SeriesState {
  series: Serie[];
  seriesDetail: SerieDetail | null;
  selectedId: number | null;
  searchState: ComponentState;
  detailState: ComponentState;
  query: string;
}

const initialSeriesState: SeriesState = {
  series: [],
  seriesDetail: null,
  selectedId: null,
  searchState: 'idle',
  detailState: 'idle',
  query: '',
};

/**
 * SeriesStore
 *
 * @description
 * Signal store for managing series data.
 *
 * @property {SeriesState} state - The state of the series store.
 * @property {Signal<Serie[]>} series - The series data.
 * @property {Signal<SerieDetail | null>} seriesDetail - The series detail data.
 * @property {Signal<number | null>} selectedId - The selected series ID.
 * @property {Signal<ComponentState>} searchState - The search state.
 * @property {Signal<ComponentState>} detailState - The detail state.
 * @property {Signal<string>} query - The search query.
 */
export const SeriesStore = signalStore(
  withState<SeriesState>(initialSeriesState),
  // changes to the state
  withReducer(
    on(SeriesApiEvents.loadedSuccess, ({ payload: series }) => ({
      series,
      searchState: 'loaded',
    })),
    on(SeriesApiEvents.loadedFailure, () => ({
      searchState: 'error',
    })),
    on(SeriesEvents.queryChanged, ({ payload: { query } }) => ({
      query,
      searchState: 'loading',
    })),
    on(SeriesEvents.seriesSelected, ({ payload: { theTvDbId } }) => ({
      selectedId: theTvDbId,
      detailState: 'loading',
    })),
    on(SeriesApiEvents.detailLoadedSuccess, ({ payload: seriesDetail }) => ({
      seriesDetail,
      detailState: 'loaded',
    })),
    on(SeriesApiEvents.detailLoadedFailure, () => ({
      detailState: 'error',
    }))
  ),
  // Listen Eventos to side effects
  withEventHandlers(
    (
      store,
      events = inject(Events),
      seriesService = inject(SeriesService)
    ) => ({
      loadSeriesByQuery$: events.on(SeriesEvents.queryChanged).pipe(
        debounceTime(DEBOUNCE_TIME_DEFAULT),
        switchMap(({ payload }) =>
          seriesService.searchSeries(payload.query).pipe(
            mapResponse({
              next: (series) => SeriesApiEvents.loadedSuccess(series),
              error: (e: Error) => {
                SeriesApiEvents.loadedFailure(
                  e.message || 'Error loading series'
                );
              },
            })
          )
        )
      ),
      loadSeriesDetail$: events.on(SeriesEvents.seriesSelected).pipe(
        filter(({ payload }) => !!payload.theTvDbId),
        switchMap(({ payload }) =>
          seriesService.getSeriesDetail(payload.theTvDbId).pipe(
            mapResponse({
              next: (detail) => SeriesApiEvents.detailLoadedSuccess(detail),
              error: (e: Error) => {
                SeriesApiEvents.detailLoadedFailure(
                  e.message || 'Error loading series details'
                );
              },
            })
          )
        )
      ),
    })
  )
);
