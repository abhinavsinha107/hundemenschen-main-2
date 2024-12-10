import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const StatusList = () => {
  const items = [
    { color: Colors.light.mediumGreen, text: 'UNBEKANNT' }, // Green check
    { color: Colors.light.darkGray, text: 'UNBEKANNT' }, // Dark gray check
    { color: Colors.light.white, text: 'UNBEKANNT' }, // White check
    { color: Colors.light.darkGreen, text: 'UNBEKANNT' }, // Olive green check
    { color: Colors.light.attentionRed, text: 'UNBEKANNT' }, // Red check
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
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};
export const CheckElement = ({ color, text }) => {
  return (
    <View style={styles.item}>
      <FontAwesome name="check" size={16} color={color} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.white, // Gray background
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.white, // Light gray border
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkElementItem: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.light.darkGray, // Dark text color
  },
});

export default StatusList;
