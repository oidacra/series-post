import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { Serie } from '../../../../shared/models';
import { SERIES_STATUS_COLOR_MAP } from '../../../../shared/constants';

@Component({
  selector: 'app-series-card',
  imports: [
    NzCardComponent,
    NzCardMetaComponent,
    NgOptimizedImage,
    NzIconModule,
    NzTagComponent,
  ],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesCardComponent {
  item = input.required<Serie>();
  readonly colorStatusSeriesMap = SERIES_STATUS_COLOR_MAP;
}
