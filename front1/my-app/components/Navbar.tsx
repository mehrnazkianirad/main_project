import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { navbarstyles } from './style-sheet';

const Navbar = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={navbarstyles?.container || { padding: 16, backgroundColor: '#1DB954' }}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={navbarstyles.title}>My App</Text>
    </View>
  );
};

export default Navbar;
