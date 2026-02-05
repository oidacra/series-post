import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ComponentState, Serie, SeriesStatus } from '../../../../shared/models';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { SeriesCardComponent } from '../series-card/series-card.component';

/**
 * ResultsComponent
 *
 * @description
 * Component that displays a list of series and emits an event when a series is selected.
 *
 * @property {Input<Serie[]>} series - The list of series to display.
 * @property {Input<ComponentState>} state - The current state of the component (e.g., 'idle', 'loading', 'error').
 * @property {Output<Serie>} selected - Event emitted when a series is selected.
 * @property {readonly Array<number>} skeletonItems - Array of items used for generating skeleton loaders.
 */
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NzEmptyComponent,
    SeriesCardComponent,
    NzTypographyComponent,
    NzCardComponent,
    NzSkeletonModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  /**
   * The list of series to display.
   */
  series = input<Serie[]>([]);

  /**
   * The current state of the component (e.g., 'idle', 'loading', 'error').
   */
  state = input<ComponentState>('idle');

  /**
   * Computed signal that returns true if the state is 'loading'.
   */
  isLoading = computed(() => this.state() === 'loading');

  /**
   * Event emitted when a series is selected.
   */
  selected = output<Serie>();

  /**
   * Array of items used for generating skeleton loaders.
   */
  readonly skeletonItems = Array.from({ length: 12 });
}
