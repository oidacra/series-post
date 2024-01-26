import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { SeriesStore } from './store/series.store';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { SeriesService } from './services/series.service';
import { ViewModelComponent } from './shared/series.models';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzImageDirective } from 'ng-zorro-antd/image';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-series',
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
  ],
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  providers: [SeriesStore, SeriesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesComponent implements OnInit {
  private readonly store = inject(SeriesStore);
  readonly vm: Signal<ViewModelComponent> = this.store.vm; // Our ViewModel exposed to the template

  ngOnInit(): void {
    this.store.getAllSeries();
  }
}
