import { MusicItem } from '../lib/music';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSpotifyTracks = async (query: string): Promise<MusicItem[]> => {
  try {
    const tokenResponse = await fetch('http://192.168.1.X:8001/api/spotify-token/');
    const tokenData = await tokenResponse.json();
    const token = tokenData.token;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data.tracks.items.map((item: any): MusicItem => ({
      id: item.id,
      title: item.name,
      artist: item.artists[0].name,
      image: item.album.images[0].url,
      url: item.external_urls.spotify,
      source: 'spotify',  // Make sure this is typed correctly as 'spotify'
      cover: item.album.images[0].url,
    }));
  } catch (error) {
    console.error("Error fetching Spotify tracks:", error);
    return [];
  }
};

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (playlistId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlist');
      }

      const data = await response.json();
      return data.tracks.items; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);