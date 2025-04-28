export const fetchYoutubeVideos = async (query: string) => {
    const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`)
    const data = await res.json()
    return data.videos ?? []
  }
  