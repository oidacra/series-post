import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';

import { SeriesService } from '../services/series.service';
import { SeriesStore } from '../series.store';

import { injectDispatch } from '@ngrx/signals/events';
import { SeriesEvents } from '../series.events';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [ResultsComponent, SearchComponent],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
  providers: [SeriesService, SeriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchContainerComponent {
  readonly store = inject(SeriesStore);
  private readonly dispatch = injectDispatch(SeriesEvents);

  searchSeries(formValue: string) {
    this.dispatch.queryChanged({ query: formValue });
  }
}
