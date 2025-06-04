import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import {footerStyles}  from './style-sheet';

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={footerStyles.footerContainer}>
      <Text style={footerStyles.footerText}>© 2025 BoxiTun. All rights reserved.</Text>
      <View style={footerStyles.linksContainer}>
        <TouchableOpacity onPress={() => openLink('https://yourwebsite.com/about')}>
          <Text style={footerStyles.footerLink}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://yourwebsite.com/contact')}>
          <Text style={footerStyles.footerLink}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
