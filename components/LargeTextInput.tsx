import React from 'react';
import Text from '@/components/Text';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const LargeTextInput = ({ label, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    maxWidth: 400, // Set a maximum width for larger screens
  },
  label: {
    fontSize: 16,
    color: Colors.light.darkGray,
    marginBottom: 5,
  },
  input: {
    height: 120, // Height for a larger input box
    borderColor: Colors.light.lightGreen, // Green border color
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: Colors.light.darkGray,
    backgroundColor: Colors.light.white, // Background color
  },
});

export default LargeTextInput;
