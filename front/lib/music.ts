import { fetchSpotifyTracks } from "../actions/fetchSpotifyTracks"
import { fetchYoutubeVideos } from "../actions/fetchYoutubeVideos"
import { fetchAppleMusic } from "../actions/fetchAppleMusic"

export type MusicService = "spotify" | "youtube" | "apple"

export interface MusicItem {
  id: string
  title: string
  artist: string
  image: string
  url: string
  source: MusicService
  cover: string
}

export const searchMusic = async (
  service: MusicService,
  query: string
): Promise<MusicItem[]> => {
  switch (service) {
    case "spotify":
      const spotifyResults = await fetchSpotifyTracks(query)
      return spotifyResults.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists?.[0]?.name ?? "",
        image: track.album?.images?.[0]?.url ?? "",
        url: track.external_urls?.spotify ?? "",
        source: "spotify"
      }))

    case "youtube":
      const youtubeResults = await fetchYoutubeVideos(query)
      return youtubeResults.map((video: any) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        artist: video.snippet.channelTitle,
        image: video.snippet.thumbnails?.high?.url ?? "",
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        source: "youtube"
      }))

    case "apple":
      const appleResults = await fetchAppleMusic(query)
      return appleResults.map((song: any) => ({
        id: song.id,
        title: song.attributes.name,
        artist: song.attributes.artistName,
        image: song.attributes.artwork?.url
          ?.replace("{w}", "300")
          ?.replace("{h}", "300") ?? "",
        url: song.attributes.url,
        source: "apple"
      }))

    default:
      return []
  }
}
