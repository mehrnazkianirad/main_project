import React, { useEffect } from 'react';
import { FlatList, Text, Image, View, ActivityIndicator } from 'react-native';
import { fetchPlaylist } from '../actions/fetchSpotifyTracks';
import { playlistScreenStyles } from './style-sheet';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const PlaylistScreen = () => {
  const dispatch = useAppDispatch();
  const { playlist, loading, error } = useAppSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(fetchPlaylist('YOUR_PLAYLIST_ID'));
  }, [dispatch]);

  if (loading) {
    return (
      <View style={playlistScreenStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={playlistScreenStyles.errorContainer}>
        <Text style={playlistScreenStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={playlistScreenStyles.container}>
      <FlatList
        data={playlist}
        renderItem={({ item }) => (
          <View style={playlistScreenStyles.itemContainer}>
            <Image
              source={{ uri: item.track.album.images[0].url }}
              style={playlistScreenStyles.albumImage}
              resizeMode="contain"  
            />
            <Text style={playlistScreenStyles.trackName}>{item.track.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.track.id}
      />
    </View>
  );
};

export default PlaylistScreen;
