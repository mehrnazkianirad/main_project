import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MusicCard from './MusicCard';
import {musicCarouselStyles} from './style-sheet';
import { MusicItem } from '../lib/music';

type Props = {
  title: string;
  tracks: MusicItem[];
  onPressCard?: (track: MusicItem) => void;
};

const MusicCarousel = ({ title, tracks, onPressCard }: Props) => {
  return (
    <View style={musicCarouselStyles.container}>
      <Text style={musicCarouselStyles.title}>{title}</Text>
      <FlatList
        horizontal
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={musicCarouselStyles.list}
        renderItem={({ item }) => (
          <MusicCard track={item} onPress={() => onPressCard?.(item)} />
        )}
      />
    </View>
  );
};

export default MusicCarousel;
