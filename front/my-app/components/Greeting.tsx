import React from 'react';
import { View, Text } from 'react-native';
import {greetingStyles} from './style-sheet';

type GreetingProps = {
  location: { country: string; city: string } | null;
};

const Greeting = ({ location }: GreetingProps) => {
  return (
    <View>
      <Text>
        {location
          ? `Hi! You're listening from ${location.city}, ${location.country}`
          : 'Hi! We could not detect your location.'}
      </Text>
    </View>
  );
};

export default Greeting;

