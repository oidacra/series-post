import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { ComponentState, Serie } from '../../../../shared/models';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    NzEmptyComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzPaginationComponent,
    NgOptimizedImage,
    NzTypographyComponent,
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
}
