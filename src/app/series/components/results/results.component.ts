import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Serie } from '../../shared/series.models';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';

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
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  series = input<Serie[]>([]);
}
