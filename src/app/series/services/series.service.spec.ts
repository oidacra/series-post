import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SeriesService, TVMAZE_ENDPOINT } from './series.service';

import { SeriesMock } from '../tests/series.mocks';
import { Serie } from '../../shared/models';

describe('SeriesService', () => {
  let service: SeriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService],
    });

    service = TestBed.inject(SeriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  xdescribe('getSeries', () => {
    it('should return an Observable<Serie[]>', () => {
      const dummySeries: Serie[] = SeriesMock;

      service.getSeries().subscribe((series) => {
        expect(series.length).toBe(2);
        expect(series).toEqual(dummySeries);
      });

      const req = httpMock.expectOne(`${TVMAZE_ENDPOINT}/shows`);
      expect(req.request.method).toBe('GET');
      req.flush(dummySeries);
    });
  });

  describe('searchSeries', () => {
    it('should return an Observable<Serie[]> when searching series', () => {
      const dummySeries: Serie[] = SeriesMock;

      service.searchSeries('query').subscribe((series) => {
        expect(series.length).toBe(1);
        expect(series).toEqual(dummySeries);
      });

      const req = httpMock.expectOne(`${TVMAZE_ENDPOINT}/search/shows?q=query`);
      expect(req.request.method).toBe('GET');
      req.flush(dummySeries);
    });
  });
});
