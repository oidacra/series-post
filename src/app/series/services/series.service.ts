import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Serie } from '../shared/series.models';

const TVMAZE_ENDPOINT = 'https://api.tvmaze.com/';

@Injectable()
export class SeriesService {
  private httpClient = inject(HttpClient);

  getSeries(): Observable<Serie[]> {
    return this.httpClient
      .get<Serie[]>(`${TVMAZE_ENDPOINT}shows`)
      .pipe(tap((s) => console.log(s)));
  }
}
