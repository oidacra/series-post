import { Injectable, Signal } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { SeriesService } from '../services/series.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Serie,
  SeriesState,
  ViewModelComponent,
} from '../shared/series.models';
import { initialSeriesState } from '../shared/series.constants';

@Injectable()
export class SeriesStore extends ComponentStore<SeriesState> {
  // Updaters
  readonly addSeries = this.updater((state, series: Serie[]) => {
    return { ...state, series, state: 'loaded' };
  });
  // Effects
  readonly getAllSeries = this.effect<void>((trigger$) =>
    trigger$.pipe(
      // Define the state of the component as loading
      tap(() => this.patchState({ state: 'loading' })),
      switchMap(() =>
        this.seriesService.getSeries().pipe(
          tapResponse({
            // When the request is successful, update the store
            next: (movies) => this.addSeries(movies),
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
  private readonly isLoading: Signal<boolean> = this.selectSignal(
    (state) => state.state === 'loading'
  );
  // This is the ViewModel exposed to the component
  readonly vm: Signal<ViewModelComponent> = this.selectSignal(
    this.series,
    this.isLoading,
    (series, isLoading) => ({ series, isLoading })
  );

  constructor(private readonly seriesService: SeriesService) {
    super(initialSeriesState); // <--- Initialization when the store is created

    // Only for debugging purposes
    this.state$.subscribe((state) => console.log(state));
  }

  private handleError(e: HttpErrorResponse) {
    console.log(e);
  }
}
