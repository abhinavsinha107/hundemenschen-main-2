import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const CompleteProfileScreen = () => {
  const handleCompleteNow = () => {
    router.navigate('./dogidform');
  };

  const handleCompleteLater = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gesamtprofil</Text>

      <Text style={styles.subtitle}>
        Profil in 6 Schritten vervollständigen.
      </Text>

      <View style={styles.stepsContainer}>
        {[
          'Schnellprofil',
          'Merkmale & ID',
          'Kontaktdaten Halter*in',
          'Zweitkontakt',
          'Kontaktdaten TA/Behandelnde',
          'Medizinisches',
          'Allgemeines',
        ].map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.circle} />
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.description}>
        In der vollständigen Gesundheitsakte kannst du medizinische Daten deines
        Hundes sammeln und durch Export im Notfall für Tierärzte oder
        Hundebetreuer*innen zugänglich machen.
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.completeNowButton}
          onPress={handleCompleteNow}
        >
          <Text style={styles.completeNowButtonText}>
            JETZT VERVOLLSTÄNDIGEN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeLaterButton}
          onPress={handleCompleteLater}
        >
          <Text style={styles.completeLaterButtonText}>SPÄTER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.light.lightGreen, // Light green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.light.darkGray,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.light.darkGray,
    lineHeight: 22,
  },
  stepsContainer: {
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.vitalGreen,
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: Colors.light.darkGray,
  },
  description: {
    fontSize: 14,
    color: Colors.light.mediumGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeNowButton: {
    flex: 1,
    backgroundColor: Colors.light.darkGray,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  completeNowButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeLaterButton: {
    flex: 1,
    backgroundColor: Colors.light.white,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.darkGray,
  },
  completeLaterButtonText: {
    color: Colors.light.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompleteProfileScreen;
