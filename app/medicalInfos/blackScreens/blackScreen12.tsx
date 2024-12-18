import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { router } from 'expo-router';
import BlackScreenButtons from '@/components/blackScreenButtons';
import BlackScreenHeroSection from '@/components/blackScreenHeroSection';
import { Feather } from '@expo/vector-icons';

const details = [
  'Beobachtungen am Hund',
  'Beobachtungen der Bewegung',
  'Bewegung beim Spaziergang',
  'Lorem ipsum',
  'Lorem ipsum',
  'Lorem ipsum',
];

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 55, paddingHorizontal: 30 }}>
        <BlackScreenHeroSection heading="Allgemeine" subHeading="Fragen" />
        <View style={styles.detailsView}>
          {details.map((detail, index) => (
            <View key={index} style={styles.bulletContainer}>
              <Feather name="check" size={24} color="#fff" />
              <Text style={styles.bulletPoint}>{detail}</Text>
            </View>
          ))}
        </View>
      </View>
      <BlackScreenButtons disableBack={true} onContinueClick={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#3B3B3B',
    position: 'relative',
  },
  detailsView: {
    paddingVertical: 40,
  },
  bulletContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  bulletPoint: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Brother 1816 Printed',
    color: '#fff',
    lineHeight: 20,
  },
  question: {
    marginLeft: 10,
    maxWidth: '90%',
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: '#fff',
  },
});
