import React from 'react';
import Text from '@/components/Text';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const CustomButton_Platzhalter = ({
  title,
  icon,
  color,
  textColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, borderColor: borderColor || color },
      ]}
    >
      {icon && (
        <FontAwesome
          name={icon}
          size={18}
          color={textColor}
          style={styles.icon}
        />
      )}

      <Text style={[styles.text, { color: textColor }]}>{title}</Text>

      <FontAwesome name="chevron-right" size={16} color={textColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.lightGray, // Gray background for the screen
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Make the text take up all available space between icon and chevron
  },
});

export default CustomButton_Platzhalter;
