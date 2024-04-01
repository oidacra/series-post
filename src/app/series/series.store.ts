import { Injectable, Signal } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  ComponentState,
  Serie,
  SeriesState,
  ViewModelComponent,
} from '../shared/models';
import { debounceTime, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SeriesService } from './services/series.service';
import { initialSeriesState } from '../shared/constants';

const DEBOUNCE_TIME_DEFAULT = 300;

@Injectable()
export class SeriesStore extends ComponentStore<SeriesState> {
  // Updaters
  readonly addSeries = this.updater((state, series: Serie[]) => {
    return { ...state, series, state: 'loaded' };
  });
  readonly setQuery = this.updater((state, query: string) => {
    return { ...state, query };
  });

  readonly searchSeries = this.effect<string>((query$) =>
    query$.pipe(
      debounceTime(DEBOUNCE_TIME_DEFAULT),
      // Define the state of the component as loading
      tap(() => this.patchState({ state: 'loading' })),
      switchMap((query) =>
        this.seriesService.searchSeries(query).pipe(
          tapResponse({
            // When the request is successful, update the store
            next: (series) => {
              return this.addSeries(series);
            },
            error: (e: HttpErrorResponse) => {
              // When the request fails, update the store with the error state
              this.patchState({ state: 'error' });
              this.handleError(e);
            },
          })
        )
      )
    )
  );

  // Selectors
  private readonly series: Signal<Serie[]> = this.selectSignal(
    (state) => state.series
  );
  private readonly componentState: Signal<ComponentState> = this.selectSignal(
    ({ state }) => state
  );

  // This is the ViewModel exposed to the component
  readonly vm: Signal<ViewModelComponent> = this.selectSignal(
    this.series,
    this.componentState,
    (series, state) => ({ series, state })
  );

  constructor(private readonly seriesService: SeriesService) {
    super(initialSeriesState); // <--- Initialization when the store is created
  }

  private handleError(e: HttpErrorResponse) {
    console.warn(e);
  }
}
