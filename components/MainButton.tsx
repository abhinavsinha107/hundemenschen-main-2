import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const MainThemeButton = ({ title }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome
        name="chevron-right"
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
    backgroundColor: Colors.light.white,
    width: '100%',
    maxWidth: 400, // Adjust this value to control width on larger screens
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    height: 60,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.darkGray,
  },
});

export default MainThemeButton;
