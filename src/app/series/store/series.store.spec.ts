import { TestBed } from '@angular/core/testing';

import { SeriesStore } from './series.store';
import { SeriesService } from '../services/series.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeriesStoreService', () => {
  let service: SeriesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesStore, SeriesService],
    });
    service = TestBed.inject(SeriesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
