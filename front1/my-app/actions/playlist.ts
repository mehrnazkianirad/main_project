import { AppDispatch } from '../redux/store';
import { getPlaylist } from '../api/index';   

export const fetchPlaylist = (playlistId: string) => async (dispatch: AppDispatch) => {
  try {
    const data = await getPlaylist(playlistId);
    dispatch({
      type: 'FETCH_PLAYLIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const err = error as Error;
    dispatch({
      type: 'FETCH_PLAYLIST_ERROR',
      error: err.message,
    });
  }
};
