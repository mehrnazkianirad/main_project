export const fetchSpotifyTracks = async (search: string) => {
  try {
    const tokenRes = await fetch("/api/spotify-token/"); 
    const { token } = await tokenRes.json();
  
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    return data.tracks?.items ?? [];
  } catch (error) {
    console.error('Failed to fetch Spotify tracks:', error);
    return [];
  }
};
