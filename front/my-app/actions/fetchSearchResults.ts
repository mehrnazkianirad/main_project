export const fetchSearchResults = async (query: string) => {
    const res = await fetch(`https://yourapi.com/search?query=${query}`);
    const data = await res.json();
    return data.results;
  };
  