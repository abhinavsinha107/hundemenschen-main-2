import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const DropdownButton = ({ initial, title }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.initial}>{initial}</Text>
      <View style={styles.centerContent}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome
        name="chevron-down"
        size={16}
        color={Colors.light.darkGray}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: Colors.light.darkGray,
    borderWidth: 1,
    backgroundColor: Colors.light.white,
    width: '100%',
    maxWidth: 400,
    height: 60,
  },
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center-aligns the text content
    flex: 1, // Allows it to occupy available space for centering
  },
  initial: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light.darkGray,
  },
});

export default DropdownButton;
