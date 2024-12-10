import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={Colors.light.darkGray}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Wonach suchst du?"
        placeholderTextColor={Colors.light.darkGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.white, // Background color similar to the gray background
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 10,
    width: 350,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light.black,
  },
  icon: {
    marginRight: 10,
    color: Colors.light.black,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.black,
  },
});

export default SearchBar;
