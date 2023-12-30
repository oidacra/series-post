import { TestBed } from '@angular/core/testing';

import { SeriesService } from './series.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService],
    });
    service = TestBed.inject(SeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
