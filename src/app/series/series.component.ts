import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { SeriesStore } from './store/series.store';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SeriesService } from './services/series.service';
import { ViewModelComponent } from './shared/series.models';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf],
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
