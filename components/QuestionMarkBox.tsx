import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const InstructionsList = () => {
  const items = [
    {
      color: Colors.light.mediumGreen,
      text: 'Ruhe bewahren und beteiligte Menschen und Tiere beruhigen.',
      bold: true,
    }, // Green check, bold text
    {
      color: Colors.light.white,
      text: 'cbjhfcnujecnikejfmcikencjenc jcnjwncjwfncj',
    }, // White check, regular text
    {
      color: Colors.light.mediumGreen,
      text: 'cbjhfcnujecnikejfmcikencjenc jcnjwncjwfncj',
    }, // Green check, regular text
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <FontAwesome
            name="check"
            size={16}
            color={item.color}
            style={styles.icon}
          />
          <Text style={[styles.text, item.bold && styles.boldText]}>
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.white, // Background color similar to the image
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.white, // Light gray border
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 3,
  },
  text: {
    fontSize: 16,
    color: Colors.light.darkGray,
    flexShrink: 1, // Allows text to wrap if too long
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default InstructionsList;
