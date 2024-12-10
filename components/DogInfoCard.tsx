import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const DogInfoCard = () => {
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
    borderRadius: 20, // Apply rounded corners to all corners
    backgroundColor: Colors.light.white,
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
    color: Colors.light.darkGray,
  },
  subHeader: {
    fontSize: 14,
    color: Colors.light.mediumGray,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 16,
    color: Colors.light.mediumGreen, // Green color for check icon
    marginRight: 10,
  },
  infoText: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  value: {
    fontSize: 12,
    color: Colors.light.darkGray,
  },
});

export default DogInfoCard;
