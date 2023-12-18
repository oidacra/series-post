import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
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
  // Selectors
  readonly series$ = this.select((state) => state.series);
  readonly isLoading$ = this.select((state) => state.state === 'loading');

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

  // This is the ViewModel exposed to the component
  readonly vm$: Observable<ViewModelComponent> = this.select(
    this.series$,
    this.isLoading$,
    (series, isLoading) => ({
      series,
      isLoading,
    })
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
