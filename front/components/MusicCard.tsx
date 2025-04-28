import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {musiccardstyles} from './style-sheet';
import { MusicItem } from '../lib/music';

type Props = {
  track: MusicItem;
  onPress: () => void;
};

const MusicCard = ({ track, onPress }: Props) => {
  return (
    <TouchableOpacity style={musiccardstyles.card} onPress={onPress}>
      <Image source={{ uri: track.cover }} style={musiccardstyles.cover} />
      <Text style={musiccardstyles.title} numberOfLines={1}>{track.title}</Text>
      <Text style={musiccardstyles.artist} numberOfLines={1}>{track.artist}</Text>
    </TouchableOpacity>
  );
};

export default MusicCard;
