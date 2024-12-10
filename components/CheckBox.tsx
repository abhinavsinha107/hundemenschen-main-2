import React, { useState } from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const CustomCheckbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <FontAwesome name="check" size={16} color="white" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.mediumGreen,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.white,
    marginRight: 10,
  },
  checked: {
    backgroundColor: Colors.light.vitalGreen, // Background color when checked
  },
  label: {
    fontSize: 16,
    color: Colors.light.darkGray,
  },
});

export default CustomCheckbox;
