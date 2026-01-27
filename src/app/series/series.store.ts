import { effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withState,
  withHooks,
  getState,
} from '@ngrx/signals';
import {
  injectDispatch,
  on,
  ReducerEvents,
  withEventHandlers,
  withReducer,
} from '@ngrx/signals/events';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ComponentState, Serie } from '../shared/models';
import { SeriesEvents, SeriesApiEvents } from './series.events';
import { SeriesService } from './services/series.service';

const DEBOUNCE_TIME_DEFAULT = 300;

// Store state related
export interface SeriesState {
  series: Serie[];
  selectedId: number | null;
  state: ComponentState;
  query: string;
}

const initialSeriesState: SeriesState = {
  series: [],
  selectedId: null,
  state: 'idle',
  query: '',
};

export const SeriesStore = signalStore(
  withState<SeriesState>(initialSeriesState),
  // changes to the state
  withReducer(
    on(SeriesApiEvents.loadedSuccess, ({ payload: series }) => ({
      series,
      state: 'loaded',
    })),
    on(SeriesApiEvents.loadedFailure, () => ({
      state: 'error',
    })),
    on(SeriesEvents.queryChanged, ({ payload: { query } }) => ({
      query,
    }))
  ),
  // Listen Eventos to side effects
  withEventHandlers((store) => {
    const seriesService = inject(SeriesService);
    const events = inject(ReducerEvents);
    const dispatch = injectDispatch(SeriesApiEvents);

    return [
      events.on(SeriesEvents.queryChanged).pipe(
        debounceTime(DEBOUNCE_TIME_DEFAULT),
        tap(() => patchState(store, { state: 'loading' })),
        switchMap(({ payload }) =>
          seriesService.searchSeries(payload.query).pipe(
            tapResponse({
              next: (series) => dispatch.loadedSuccess(series),
              error: (e: Error) => {
                dispatch.loadedFailure(e.message || 'Error loading series');
              },
            })
          )
        )
      ),
    ];
  }),
  withHooks({
    onInit(store) {
      effect(() => {
        // 👇 The effect is re-executed on state change.
        getState(store);
      });
    },
  })
);
