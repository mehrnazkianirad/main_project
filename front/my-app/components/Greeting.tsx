import React from 'react';
import { View, Text } from 'react-native';
import {greetingStyles} from './style-sheet';

const Greeting = () => {
  return (
    <View style={greetingStyles.container}>
      <Text style={greetingStyles.hello}>👋 Hello!</Text>
      <Text style={greetingStyles.message}>
        Based on your location, here's a song you might like 🎵
      </Text>
    </View>
  );
};

export default Greeting;
