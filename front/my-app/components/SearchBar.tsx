import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import {searchBarStyles} from './style-sheet';

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim().length > 0) {
      onSearch(query.trim());
    }
  };

  return (
    <View style={searchBarStyles.container}>
      <TextInput
        style={searchBarStyles.input}
        placeholder="Search for songs, artists..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSubmit} style={searchBarStyles.icon}>
        <Feather name="search" size={20} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
