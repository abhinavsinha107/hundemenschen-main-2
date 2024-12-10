import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const RoundedButton = ({ title, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
      <Text style={[styles.buttonText, style?.color && { color: style.color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ExampleButtonsLarge = () => {
  return (
    <View style={styles.container}>
      <RoundedButton title="Antwortmöglichkeiten" style={styles.blackButton} />
      <RoundedButton title="Antwortmöglichkeiten" style={styles.greenButton} />
      <RoundedButton
        title="Antwortmöglichkeiten"
        style={styles.outlineButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
  },
  blackButton: {
    backgroundColor: Colors.light.darkGray, // Black background
    color: Colors.light.white, // White text color
  },
  greenButton: {
    backgroundColor: Colors.light.vitalGreen, // Green background
    color: Colors.light.darkGray, // Black text color
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: Colors.light.darkGray, // Border color for outline
    backgroundColor: 'transparent', // Transparent background
    color: Colors.light.darkGray, // Black text color
  },
});

export default ExampleButtonsLarge;
