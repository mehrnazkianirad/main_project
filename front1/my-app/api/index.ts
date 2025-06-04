export const getPlaylist = async (playlistId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: playlistId,
        name: 'My Playlist',
        items: [],
      });
    }, 1000);
  });
};
