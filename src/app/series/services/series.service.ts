import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import { Serie } from '../shared/series.models';

const TVMAZE_ENDPOINT = 'https://api.tvmaze.com/';
const DELAY_MS = 1000;

@Injectable()
export class SeriesService {
  private httpClient = inject(HttpClient);

  getSeries(): Observable<Serie[]> {
    return this.httpClient.get<Serie[]>(`${TVMAZE_ENDPOINT}shows`).pipe(
      delay(DELAY_MS),
      tap((s) => console.log(s))
    );
  }
}
