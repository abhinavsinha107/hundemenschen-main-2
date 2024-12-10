import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const DogInfoCard_black = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>HUNDENAME</Text>
      <Text style={styles.subHeader}>Vollständiger Hundename</Text>

      <View style={styles.infoItem}>
        <FontAwesome name="check" style={styles.icon} />
        <View style={styles.infoText}>
          <Text style={styles.label}>Geburtsdatum</Text>
          <Text style={styles.value}>GESCHÄTZT</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <FontAwesome name="check" style={styles.icon} />
        <View style={styles.infoText}>
          <Text style={styles.label}>Hundrasse(n)</Text>
          <Text style={styles.value}>MISCHLING</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <FontAwesome name="check" style={styles.icon} />
        <View style={styles.infoText}>
          <Text style={styles.label}>Geschlecht</Text>
          <Text style={styles.value}>KASTRIERT</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 310,
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 0,
    borderRadius: 20, // Apply rounded corners to all corners
    opacity: 1,
    backgroundColor: Colors.light.darkGray,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.white,
  },
  subHeader: {
    fontSize: 14,
    color: Colors.light.vitalGreen,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 16,
    color: Colors.light.mediumGreen,
    marginRight: 10,
  },
  infoText: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.white,
  },
  value: {
    fontSize: 12,
    color: Colors.light.white,
  },
});

export default DogInfoCard_black;
