export type ComponentState = 'idle' | 'loading' | 'loaded' | 'error';

// We will add more here
export interface Serie {
  score: number;
  show: SerieDetail;
}

interface SerieDetail {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string };
  rating: { average: number };
  status: SeriesStatus;
}

// Store state related
export interface SeriesState {
  series: Serie[];
  selectedId: number | null;
  state: ComponentState;
  query: string;
}

export interface ViewModelComponent {
  series: Serie[];
  state: ComponentState;
}

export type SeriesStatus = 'Running' | 'Ended' | 'ToBeAnnounced';
