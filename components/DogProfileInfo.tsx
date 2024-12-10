import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const DogProfileInfo = () => {
  return (
    <View style={styles.container}>
      {/* Empty Placeholder Card */}
      <View style={styles.card} />

      {/* Weight Information */}
      <View style={styles.card}>
        <Text style={styles.weightText}>15,8 KG</Text>
        <Text style={styles.dateText}>TT.MM.JJJJ</Text>
      </View>

      {/* Treatment Information */}
      <View style={styles.card}>
        <Text style={styles.treatmentText}>Simparica</Text>
        <Text style={styles.dateText}>TT.MM.JJJJ</Text>
        <View style={styles.separator} />
        <Text style={styles.treatmentText}>Milpro</Text>
        <Text style={styles.dateText}>TT.MM.JJJJ</Text>
      </View>

      {/* Medication Information */}
      <View style={styles.card}>
        <Text style={styles.medicationText}>Allopurinol</Text>
        <Text style={styles.dosageText}>100 mg</Text>
        <Text style={styles.dosageText}>75 mg</Text>
        <Text style={styles.timeText}>MORGENS</Text>
        <Text style={styles.timeText}>ABENDS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.white,
    borderRadius: 14,
    alignItems: 'center',
  },
  card: {
    width: 170,
    height: 140,
    backgroundColor: Colors.light.lightGray,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weightText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  dateText: {
    fontSize: 14,
    color: Colors.light.lightGray,
    marginTop: 5,
  },
  treatmentText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.darkGray,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.white,
    width: '100%',
    marginVertical: 10,
  },
  medicationText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.darkGray,
    textAlign: 'center',
    marginBottom: 5,
  },
  dosageText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.mediumGray,
  },
  timeText: {
    fontSize: 16,
    color: Colors.light.mediumGray,
    textAlign: 'center',
  },
});

export default DogProfileInfo;
