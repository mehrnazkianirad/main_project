export const fetchAppleMusic = async (search: string) => {
    const tokenRes = await fetch("/api/apple-token")
    const { token } = await tokenRes.json()
  
    const res = await fetch(`https://api.music.apple.com/v1/catalog/us/search?term=${encodeURIComponent(search)}&types=songs&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    const data = await res.json()
    return data.results?.songs?.data ?? []
  }
  