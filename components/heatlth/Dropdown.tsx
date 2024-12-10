import React, { useState } from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const Dropdown = ({ title, items, onChange, required = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (item) => {
    console.log(item);
    onChange(item.id);
    setSelected(item.value);
    setIsActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.initial}>
        {title}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Pressable onPress={() => setIsActive(!isActive)} style={styles.button}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>{selected}</Text>
        </View>
        <FontAwesome
          name="chevron-down"
          size={16}
          color={Colors.light.darkGray}
        />
      </Pressable>
      {isActive &&
        items.map((item) => (
          <Pressable
            key={item.id}
            style={styles.button}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.centerContent}>{item.value}</Text>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
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
    marginBottom: 5,
  },
  required: {
    color: '#FF0000',
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light.darkGray,
  },
});

export default Dropdown;
