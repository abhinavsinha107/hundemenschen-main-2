import React from 'react';
import Text from '@/components/Text';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const VitalityCheckUpButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonGreen}>
        <Text style={styles.title}>Vitality Check Up</Text>
        <Text style={styles.subtitle}>Lerne deinen Hund zu Beobachten</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGrey}>
        <Text style={styles.title}>Vitality Check Up</Text>
        <Text style={styles.subtitle}>Lerne deinen Hund zu Beobachten</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonGreen: {
    width: 350,
    height: 60,
    backgroundColor: Colors.light.lightGreen, // helles Grün
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonGrey: {
    width: 350,
    height: 60,
    backgroundColor: Colors.light.lightGray, // helles Grau
    borderColor: Colors.light.darkGray, // dunkle Umrandung
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.mediumGray,
  },
});

export default VitalityCheckUpButton;
