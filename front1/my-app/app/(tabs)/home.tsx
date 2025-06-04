import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Greeting from '../../components/Greeting';
import SuggestedTrackCard from '../../components/SuggestedTrackCard';
import MusicCarousel from '../../components/MusicCarousel';
import SearchBar from '../../components/SearchBar';
import MiniPlayer from '../../components/MiniPlayer';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { MusicItem } from '../../lib/music';
import { fetchSpotifyTracks } from '../../actions/fetchSpotifyTracks';
import { useRouter } from 'expo-router';
import { getSpotifyToken } from '../../actions/auth';

export default function HomeScreen() {
  const [suggestedTrack, setSuggestedTrack] = useState<MusicItem | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<MusicItem | null>(null);
  const [searchResults, setSearchResults] = useState<MusicItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [location, setLocation] = useState<{ country: string; city: string } | null>(null);
  const router = useRouter();

  // Check Spotify token for auth
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getSpotifyToken();
      if (!token) router.replace('../../login');
    };
    checkAuth();
  }, []);

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        const geo = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        if (geo.length > 0) {
          const { country, city } = geo[0];
          setLocation({ country: country || 'Unknown', city: city || 'Unknown' });
        }
      }
    })();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return setSearchResults([]);
    try {
      const results = await fetchSpotifyTracks(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNextTrack = () => {};
  const handlePrevTrack = () => {};

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#000000', '#434343', '#222222']}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Navbar */}
        <Navbar />

        {/* Welcome Section */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, color: '#fff' }}>Welcome to Boxi</Text>
        </View>

        {/* Greeting based on location */}
        <Greeting location={location} />

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* If user searched something */}
        {searchResults.length > 0 && (
          <MusicCarousel title="Search Results" tracks={searchResults} />
        )}

        {/* Suggested track card */}
        {suggestedTrack && (
          <SuggestedTrackCard
            track={suggestedTrack}
            onPlayPress={(track) => setSelectedTrack(track)}
          />
        )}

        {/* Recommended carousels (mock / future dynamic) */}
        <MusicCarousel title="Trending Now" tracks={[]} />
        <MusicCarousel title="New Releases" tracks={[]} />
        <MusicCarousel title="Made for You" tracks={[]} />
        <MusicCarousel title="Top Artists in Your Area" tracks={[]} />

        {/* Mini player */}
        <MiniPlayer
          track={selectedTrack?.title || 'Current Track'}
          artist={selectedTrack?.artist || 'Current Artist'}
          onPlayPause={handlePlayPause}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          isPlaying={isPlaying}
        />

        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}
