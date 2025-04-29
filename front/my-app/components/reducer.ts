const initialState = {
    playlist: [],
    loading: false,
    error: null,
  };
  
  const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PLAYLIST_SUCCESS':
        return { ...state, playlist: action.payload, loading: false };
      case 'FETCH_PLAYLIST_ERROR':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default playlistReducer;
  