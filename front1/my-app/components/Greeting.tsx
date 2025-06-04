import React from 'react';
import { View, Text } from 'react-native';
import { greetingStyles } from './style-sheet';

type GreetingProps = {
  location: { country: string; city: string } | null;
};

const Greeting = ({ location }: GreetingProps) => {
  return (
    <View style={greetingStyles.container}>
      <Text style={greetingStyles.text}>
        {location ? (
          <>
            Hi! You're listening from <Text style={greetingStyles.highlightedText}>{location.city}</Text>, <Text style={greetingStyles.highlightedText}>{location.country}</Text>
          </>
        ) : (
          'Hi! We could not detect your location.'
        )}
      </Text>
    </View>
  );
};

export default Greeting;