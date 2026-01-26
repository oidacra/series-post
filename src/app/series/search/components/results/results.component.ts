import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { ComponentState, Serie, SeriesStatus } from '../../../../shared/models';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { SeriesCardComponent } from './components/series-card/series-card.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NzEmptyComponent, SeriesCardComponent, NzTypographyComponent],
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
