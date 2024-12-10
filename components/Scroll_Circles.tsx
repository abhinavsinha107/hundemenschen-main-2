import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const CirclePattern = () => {
  const circles = [
    [Colors.light.mediumGreen, Colors.light.lightGreen, Colors.light.white],
    [Colors.light.white, Colors.light.mediumGreen, Colors.light.lightGreen],
    [Colors.light.white, Colors.light.white, Colors.light.mediumGreen],
    [Colors.light.mediumGreen, Colors.light.white, Colors.light.white],
  ];

  return (
    <View style={styles.container}>
      {circles.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((color, colIndex) => (
            <View
              key={colIndex}
              style={[styles.circle, { backgroundColor: color }]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.white, // Background color matching the gray background in the image
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.light.white, // Light gray border
    gap: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    padding: 2,
  },
});

export default CirclePattern;
