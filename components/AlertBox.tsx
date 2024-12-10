import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const AlertBox = ({ title, message, boldMessage }) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="exclamation-circle"
        size={18}
        color={Colors.light.attentionRed}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {boldMessage && <Text style={styles.boldMessage}>{boldMessage}</Text>}
      </View>
      <TouchableOpacity>
        <FontAwesome
          name="times"
          size={18}
          color={Colors.light.darkGray}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.light.lightGray, // Light gray background for the box
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.mediumGray,
    padding: 10,
    marginVertical: 5,
    width: 300,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Adds a subtle shadow for depth
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  boldMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  closeIcon: {
    marginLeft: 10,
    marginTop: 2,
  },
});

export default AlertBox;
