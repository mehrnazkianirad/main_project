import React, { useEffect } from 'react';
import { FlatList, Text, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from './actions';

const PlaylistScreen = () => {
  const dispatch = useDispatch();
  const { playlist, loading, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(fetchPlaylist('YOUR_PLAYLIST_ID'));
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={playlist.items}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Image source={{ uri: item.track.album.images[0].url }} style={{ width: 50, height: 50 }} />
            <Text style={{ marginLeft: 10 }}>{item.track.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.track.id}
      />
    </View>
  );
};

export default PlaylistScreen;
