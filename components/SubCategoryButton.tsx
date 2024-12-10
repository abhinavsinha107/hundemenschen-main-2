import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const SubCategoryButton = ({ title }) => {
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
    backgroundColor: Colors.light.vitalGreen, // Green background color
    width: '100%',
    height: 60,
    maxWidth: 400, // Adjust as needed
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center', // Centers the text horizontally
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.darkGray, // Black text color
  },
});

export default SubCategoryButton;
