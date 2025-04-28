import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { View, ScrollView, Text } from 'react-native';
import Greeting from './Greeting';
import SuggestedTrackCard from './SuggestedTrackCard';
import MusicCarousel from './MusicCarousel';
import SearchBar from './SearchBar';
import MiniPlayer from './MiniPlayer';
import Footer from './Footer';
import Navbar from './Navbar';
import { MusicItem } from '../lib/music';
import { fetchSpotifyTracks } from '../actions/fetchSpotifyTracks';
import { homestyles } from './style-sheet';

const HomeScreen = () => {
  const [suggestedTrack, setSuggestedTrack] = useState<MusicItem | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<MusicItem | null>(null);
  const [trendingTracks, setTrendingTracks] = useState<MusicItem[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<MusicItem[]>([]);
  const [searchResults, setSearchResults] = useState<MusicItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri();
  console.log("Redirect URI for Spotify:", redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'YOUR_SPOTIFY_CLIENT_ID',  
      scopes: ['user-library-read', 'playlist-read'],
      redirectUri,  
    },
    null 
  );

  useEffect(() => {
    fetchSuggestedTrack();
    fetchTrending();
    fetchRecentlyPlayed();

    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log("Access Token:", access_token);
    }
  }, [response]);

  const fetchSuggestedTrack = async () => {
    try {
      const res = await fetch('https://yourapi.com/suggested');
      const data = await res.json();
      setSuggestedTrack(data.track);
    } catch (error) {
      console.error('Failed to fetch suggested track:', error);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await fetch('https://yourapi.com/trending');
      const data = await res.json();
      setTrendingTracks(data.tracks);
    } catch (error) {
      console.error('Failed to fetch trending tracks:', error);
    }
  };

  const fetchRecentlyPlayed = async () => {
    try {
      const res = await fetch('https://yourapi.com/recently-played');
      const data = await res.json();
      setRecentlyPlayed(data.tracks);
    } catch (error) {
      console.error('Failed to fetch recently played tracks:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const tracks = await fetchSpotifyTracks(query);
      setSearchResults(tracks);
    } catch (error) {
      console.error('Failed to search tracks:', error);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setSelectedTrack({
      id: "next-id",
      title: "Next Track",
      artist: "Next Artist",
      image: "",
      url: "",
      source: "spotify",
      cover: ""
    });
  };

  const handlePrevTrack = () => {
    setSelectedTrack({
      id: "previous-id",
      title: "Previous Track",
      artist: "Previous Artist",
      image: "",
      url: "",
      source: "spotify",
      cover: ""
    });
  };

  return (
    <ScrollView contentContainerStyle={homestyles.container}>
      <Navbar />

      <View style={homestyles.header}>
        <Text style={homestyles.headerText}>Welcome to the Home Screen</Text>
      </View>

      <Greeting />

      <SearchBar onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <MusicCarousel title="🔍 Search Results" tracks={searchResults} />
      )}

      {suggestedTrack && (
        <SuggestedTrackCard
          track={suggestedTrack}
          onPlayPress={(track) => setSelectedTrack(track)}
        />
      )}

      <MusicCarousel title="🔥 Trending in your area" tracks={trendingTracks} />
      <MusicCarousel title="🎧 Recently Played" tracks={recentlyPlayed} />

      <MiniPlayer
        track={selectedTrack ? selectedTrack.title : "Current Track"}
        artist={selectedTrack ? selectedTrack.artist : "Current Artist"}
        onPlayPause={handlePlayPause}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        isPlaying={isPlaying}
      />

      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;
