import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const TagButton = ({ title, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
      <Text style={[styles.buttonText, style?.color && { color: style.color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TagButtons = () => {
  return (
    <View style={styles.container}>
      <TagButton title="Platzhalter" style={styles.outlineButton} />
      <TagButton title="Platzhalter" style={styles.greenButton} />
      <TagButton title="Platzhalter" style={styles.blackButton} />
      <TagButton title="Platzhalter" style={styles.whiteButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light.black,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.light.vitalGreen, // Green color for outline
    backgroundColor: 'transparent',
    color: Colors.light.black,
  },
  greenButton: {
    backgroundColor: Colors.light.vitalGreen, // Green background
    color: Colors.light.black,
  },
  blackButton: {
    backgroundColor: Colors.light.darkGray, // Black background
    color: Colors.light.white,
  },
  whiteButton: {
    backgroundColor: Colors.light.white, // White background
    borderColor: Colors.light.white,
    borderWidth: 1,
    color: Colors.light.black,
  },
});

export default TagButtons;
