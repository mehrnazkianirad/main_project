export const fetchPlaylist = (playlistId) => async (dispatch) => {
    try {
      const data = await getPlaylist(playlistId);
      dispatch({
        type: 'FETCH_PLAYLIST_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_PLAYLIST_ERROR',
        error: error.message,
      });
    }
  };
  