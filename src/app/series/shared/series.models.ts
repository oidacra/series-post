export type ComponentState = 'idle' | 'loading' | 'loaded' | 'error';

export interface Serie {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

// Store state related
export interface SeriesState {
  series: Serie[];
  selectedId: number | null;
  state: ComponentState;
}

export interface ViewModelComponent {
  series: Serie[];
  isLoading: boolean;
}
