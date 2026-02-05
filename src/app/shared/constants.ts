import { SeriesStatus } from './models';

export const SERIES_STATUS_COLOR_MAP: Record<SeriesStatus, string> = {
  Running: 'green',
  Ended: 'red',
  ToBeAnnounced: 'blue',
};
