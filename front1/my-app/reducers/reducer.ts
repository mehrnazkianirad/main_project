interface PlaylistState {
  playlist: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  playlist: [],
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: any;
  error?: string;
}


const playlistReducer = (state = initialState, action: Action): PlaylistState => {
  switch (action.type) {
    case 'FETCH_PLAYLIST_SUCCESS':
      return { ...state, playlist: action.payload, loading: false, error: null };
    case 'FETCH_PLAYLIST_ERROR':
  return { ...state, error: action.error ?? null, loading: false };

    default:
      return state;
  }
};

export default playlistReducer;
