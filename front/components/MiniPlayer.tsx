import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import { miniPlayerStyles } from './style-sheet'; 

type Props = {
  track: string;
  artist: string;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  isPlaying: boolean;
};

const MiniPlayer = ({
  track,
  artist,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  isPlaying,
}: Props) => {
  return (
    <View style={miniPlayerStyles.container}>
      <View style={miniPlayerStyles.infoContainer}>
        <Text style={miniPlayerStyles.trackName}>{track}</Text>
        <Text style={miniPlayerStyles.artistName}>{artist}</Text>
      </View>

      <View style={miniPlayerStyles.controlsContainer}>
        <TouchableOpacity onPress={onPrevTrack} style={miniPlayerStyles.controlButton}>
          <Ionicons name="play-skip-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause} style={miniPlayerStyles.controlButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNextTrack} style={miniPlayerStyles.controlButton}>
          <Ionicons name="play-skip-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Slider style={miniPlayerStyles.progressBar} minimumValue={0} maximumValue={100} value={50} />
    </View>
  );
};

export default MiniPlayer;
