import { MusicItem } from '../lib/music';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSpotifyTracks = async (query: string): Promise<MusicItem[]> => {
  try {

    const tokenResponse = await fetch('http://192.168.1.X:8001/api/spotify-token/');
    const tokenData = await tokenResponse.json();
    const token = tokenData.token;

    const response = await fetch(`http://192.168.1.X:8001/api/location-music/?query=${query}`, {  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data.spotify.map((item: any): MusicItem => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      image: item.image,
      url: item.url,
      source: 'spotify',  
      cover: item.cover,
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
      const response = await fetch(`http://192.168.1.X:8001/api/spotify-token/`, {
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
