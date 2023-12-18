import { TestBed } from '@angular/core/testing';

import { SeriesStore } from './series.store';

describe('SeriesStoreService', () => {
  let service: SeriesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
