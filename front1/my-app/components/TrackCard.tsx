import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MusicItem } from '../lib/music';

export default function TrackCard({ track }: { track: MusicItem }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: track.image }}
        style={styles.image}
        resizeMode="contain" 
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#aaa',
  },
});
