import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Serie } from '../shared/series.models';

const TVMAZE_ENDPOINT = 'https://api.tvmaze.com';

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
    return this.httpClient
      .get<Serie[]>(`${TVMAZE_ENDPOINT}/shows`)
      .pipe(tap(s => console.log(s)));
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
      .get<Serie[]>(`${TVMAZE_ENDPOINT}/search/shows`, { params })
      .pipe(tap(s => console.log(s)));
  }
}
