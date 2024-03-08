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
  isLoading: boolean;
}
