export interface PlaylistState {
  playlist: any[];
  loading: boolean;
  error: string | null;
  items: PlaylistItem[];
}

export interface Action {
  type: string;
  payload?: any;
  error?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
}


export type PlaylistAction =
  | { type: 'FETCH_PLAYLIST_REQUEST' }
  | { type: 'FETCH_PLAYLIST_SUCCESS'; payload: PlaylistItem[] }
  | { type: 'FETCH_PLAYLIST_FAILURE'; error: string };
