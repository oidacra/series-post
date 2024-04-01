import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';

import { SeriesService } from '../services/series.service';
import { SeriesStore } from '../series.store';
import { ViewModelComponent } from '../../shared/models';

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
  private readonly store = inject(SeriesStore);
  readonly vm: Signal<ViewModelComponent> = this.store.vm;

  searchSeries(formValue: string) {
    this.store.searchSeries(formValue);
  }
}
