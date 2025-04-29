import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {suggestedTrackCardStyles} from './style-sheet';
import { MusicItem } from '../lib/music'; 

type Props = {
  track: MusicItem;
  onPlayPress?: (track: MusicItem) => void;
};

const SuggestedTrackCard = ({ track, onPlayPress }: Props) => {
  return (
    <View style={suggestedTrackCardStyles.card}>
      <Image source={{ uri: track.cover }} style={suggestedTrackCardStyles.image} />
      <View style={suggestedTrackCardStyles.info}>
        <Text style={suggestedTrackCardStyles.title}>{track.title}</Text>
        <Text style={suggestedTrackCardStyles.artist}>By {track.artist}</Text>
        <TouchableOpacity
          style={suggestedTrackCardStyles.button}
          onPress={() => onPlayPress && onPlayPress(track)}
        >
          <Text style={suggestedTrackCardStyles.buttonText}>▶ Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuggestedTrackCard;
