export type ComponentState = 'idle' | 'loading' | 'loaded' | 'error';

export interface Serie {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string };
  rating: { average: number };
  status: SeriesStatus;
  score?: number;
  externals: { thetvdb: number };
}

export interface SerieDetail extends Serie {
  officialSite: string;
  genres: string[];
  premiered: string;
  ended: string;
  language: string;
  schedule: { time: string; days: string[] };
}

export interface SerieResponse {
  score: number;
  show: Serie;
}

export interface ViewModelComponent {
  series: Serie[];
  state: ComponentState;
}

export type SeriesStatus = 'Running' | 'Ended' | 'ToBeAnnounced';
