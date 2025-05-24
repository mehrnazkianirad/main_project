import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaylist } from '../api/index';

interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
}

interface PlaylistState {
  playlist: { track: Track }[];
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  playlist: [],
  loading: false,
  error: null,
};

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (playlistId: string) => {
    const data = await getPlaylist(playlistId);
    return data;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.items; 
        state.error = null;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default playlistSlice.reducer;
