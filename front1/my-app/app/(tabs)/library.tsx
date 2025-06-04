import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MusicItem } from '../../lib/music'; 
import TrackCard from '../../components/TrackCard'; 

export default function LibraryScreen() {
  const [libraryTracks, setLibraryTracks] = useState<MusicItem[]>([]);

  // Fetch library tracks when the component mounts
  useEffect(() => {
    const fetchLibrary = async () => {
      // Dummy data for the music library
      const fakeLibrary: MusicItem[] = [
        {
          id: '1',
          title: 'My Song 1',
          artist: 'Artist 1',
          image: 'https://via.placeholder.com/150',
          url: 'https://spotify.com/song1',  // Adding url
          source: 'spotify',               // Adding source
          cover: 'https://via.placeholder.com/300' // Adding cover image
        },
        {
          id: '2',
          title: 'My Song 2',
          artist: 'Artist 2',
          image: 'https://via.placeholder.com/150',
          url: 'https://spotify.com/song2',  // Adding url
          source: 'spotify',               // Adding source
          cover: 'https://via.placeholder.com/300' // Adding cover image
        },
      ];
      setLibraryTracks(fakeLibrary);
    };

    fetchLibrary();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 My Music Library</Text>
      
      {libraryTracks.length === 0 ? (
        <Text style={styles.emptyText}>No tracks in your library yet.</Text>
      ) : (
        <FlatList
          data={libraryTracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TrackCard track={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  emptyText: { color: '#888', fontStyle: 'italic' },
});
