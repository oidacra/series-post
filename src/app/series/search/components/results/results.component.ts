import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { ComponentState, Serie, SeriesStatus } from '../../../../shared/models';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NzEmptyComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzPaginationComponent,
    NgOptimizedImage,
    NzTypographyComponent,
    NzIconModule,
    NzTagComponent,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  series = input<Serie[]>([]);
  state = input<ComponentState>('idle');
  isLoading = computed(() => this.state() === 'loading');
  selected = output<Serie>();

  readonly colorStatusSeriesMap: Record<SeriesStatus, string> = {
    Running: 'green',
    Ended: 'red',
    ToBeAnnounced: 'blue',
  };
}
