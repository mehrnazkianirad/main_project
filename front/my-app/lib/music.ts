import { fetchSpotifyTracks } from "../actions/fetchSpotifyTracks"
import { fetchYoutubeVideos } from "../actions/fetchYoutubeVideos"
import { fetchAppleMusic } from "../actions/fetchAppleMusic"
import { PlaylistState } from '../types/types';

export type MusicService = "spotify" | "youtube" | "apple"

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
  source: string; 
  cover: string;
}

export const searchMusic = async (
  service: MusicService,
  query: string
): Promise<MusicItem[]> => {
  switch (service) {
    case "spotify":
      const spotifyResults = await fetchSpotifyTracks(query);
      return spotifyResults.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists?.[0]?.name ?? "",
        image: track.album?.images?.[0]?.url ?? "",
        url: track.external_urls?.spotify ?? "",
        source: "spotify",
        cover: track.album?.images?.[1]?.url ?? ""  // Adding cover image if available
      }));

    default:
      return [];
  }
};

export interface RootState {
  playlist: PlaylistState;
}

