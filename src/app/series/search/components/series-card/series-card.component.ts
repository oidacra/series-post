import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { Serie } from '../../../../shared/models';
import { SERIES_STATUS_COLOR_MAP } from '../../../../shared/constants';

/**
 * SeriesCardComponent
 *
 * @description
 * Component that displays a series card with the series name, poster, and status.
 *
 * @property {Input<Serie>} item - The series item to display in the card.
 * @property {readonly Object} colorStatusSeriesMap - Map of series status to colors for the tag.
 */
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
  /**
   * The series item to display in the card.
   */
  item = input.required<Serie>();

  /**
   * Map of series status to colors for the tag.
   */
  readonly colorStatusSeriesMap = SERIES_STATUS_COLOR_MAP;
}
