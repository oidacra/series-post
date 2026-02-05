import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ComponentState, SerieDetail } from '../../../../shared/models';

/**
 * SeriesDetailComponent
 * 
 * @description
 * Component that displays the detailed information of a series.
 * 
 * @property {Input<SerieDetail | null>} serie - The detailed information of the series.
 * @property {Input<ComponentState>} state - The loading state of the component.
 */
@Component({
    selector: 'app-series-detail',
    standalone: true,
    imports: [NgOptimizedImage, NzTagComponent, NzButtonModule, NzSkeletonModule],
    templateUrl: './series-detail.component.html',
    styleUrl: './series-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesDetailComponent {
  /**
   * The detailed information of the series.
   */
  seriesDetail = input.required<SerieDetail | null>();

  /**
   * The loading state of the component.
   */
  state = input.required<ComponentState>();

  /**
   * Computed signal that returns true if the state is 'loading'.
   */
  isLoading = computed(() => this.state() === 'loading');
}
