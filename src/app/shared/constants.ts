import { SeriesState } from './models';

export const initialSeriesState: SeriesState = {
  series: [],
  selectedId: null,
  state: 'idle',
  query: '',
};
