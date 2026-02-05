import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { Serie } from '../../shared/models';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';

import { SeriesService } from '../services/series.service';
import { SeriesStore } from '../series.store';

import { injectDispatch } from '@ngrx/signals/events';
import { SeriesEvents } from '../series.events';

/**
 * SearchContainerComponent
 *
 * @description
 * Component that handles the search and display of series.
 * It uses the SeriesStore to manage the state of the series and dispatch events to the SeriesService.
 *
 * @property {SeriesStore} store - The SeriesStore instance.
 * @property {Dispatch<SeriesEvents>} dispatch - The dispatch function for SeriesEvents.
 *
 * @method {searchSeries} - Dispatches the queryChanged event with the new search query.
 * @method {onSeriesSelected} - Dispatches the seriesSelected event with the selected series ID.
 * @method {closeDrawer} - Dispatches the seriesSelected event with ID 0 to close the drawer.
 */
@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    ResultsComponent,
    SearchComponent,
    NzDrawerModule,
    SeriesDetailComponent,
  ],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
  providers: [SeriesService, SeriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchContainerComponent {
  readonly store = inject(SeriesStore);
  #dispatch = injectDispatch(SeriesEvents);

  /**
   * Computed signal that determines if the drawer should be visible.
   * Returns true if there is a selected series ID in the store.
   */
  isDrawerVisible = computed(() => !!this.store.selectedId());

  /**
   * Dispatches the queryChanged event with the new search query.
   * @param formValue - The search query string.
   */
  searchSeries(formValue: string) {
    this.#dispatch.queryChanged({ query: formValue });
  }

  /**
   * Dispatches the seriesSelected event with the selected series ID.
   * @param serie - The selected series object.
   */
  onSeriesSelected(serie: Serie) {
    this.#dispatch.seriesSelected({ theTvDbId: serie.externals.thetvdb });
  }

  /**
   * Closes the drawer by dispatching seriesSelected with ID 0.
   */
  closeDrawer() {
    this.#dispatch.seriesSelected({ theTvDbId: 0 }); // 0 or null to close/reset
  }
}
