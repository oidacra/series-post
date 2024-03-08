import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { SeriesStore } from './store/series.store';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { SeriesService } from './services/series.service';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzImageDirective } from 'ng-zorro-antd/image';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { ViewModelComponent } from './shared/series.models';

@Component({
  selector: 'app-series-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    NzCardComponent,
    NzCardMetaComponent,
    NgOptimizedImage,
    NzRowDirective,
    NzColDirective,
    NzPaginationComponent,
    NzSpaceItemDirective,
    NzImageDirective,
    NzEmptyComponent,
    SearchComponent,
    ResultsComponent,
  ],
  templateUrl: './series-shell.component.html',
  styleUrls: ['./series-shell.component.scss'],
  providers: [SeriesStore, SeriesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesShellComponent {
  private readonly store = inject(SeriesStore);
  readonly vm: Signal<ViewModelComponent> = this.store.vm;

  searchSeries(formValue: string) {
    this.store.searchSeries(formValue);
  }
}
