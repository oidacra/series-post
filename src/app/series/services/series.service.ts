import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Serie, SerieDetail, SerieResponse } from '../../shared/models';

export const TVMAZE_ENDPOINT = 'https://api.tvmaze.com';

/**
 * Service class for managing TV series data.
 * @injectable
 */
@Injectable()
export class SeriesService {
  private httpClient = inject(HttpClient);

  /**
   * Fetches the series from the TVMaze API.
   *
   * @return {Observable<Serie[]>} An Observable that emits an array of Serie objects.
   */
  getSeries(): Observable<Serie[]> {
    return this.httpClient.get<Serie[]>(`${TVMAZE_ENDPOINT}/shows`);
  }

  /**
   * Searches for TV series based on the provided query.
   *
   * @param {string} query - The query string used to search for TV series.
   * @return {Observable<Serie[]>} - An observable that emits an array of Serie objects matching the search query.
   */
  searchSeries(query: string): Observable<Serie[]> {
    const params = new HttpParams().set('q', query);
    return this.httpClient
      .get<SerieResponse[]>(`${TVMAZE_ENDPOINT}/search/shows`, {
        params,
      })
      .pipe(
        map((responses) =>
          responses.map(({ show, score }) => ({ ...show, score }))
        )
      );
  }

  /**
   * Fetches the series details from the TVMaze API using the TVDB ID.
   *
   * @param {number} theTvDbId - The TVDB ID of the series.
   * @return {Observable<SerieDetail>} An Observable that emits the SerieDetail object.
   */
  getSeriesDetail(theTvDbId: number): Observable<SerieDetail> {
    const params = new HttpParams().set('thetvdb', theTvDbId);
    return this.httpClient.get<SerieDetail>(`${TVMAZE_ENDPOINT}/lookup/shows`, {
      params,
    });
  }
}
