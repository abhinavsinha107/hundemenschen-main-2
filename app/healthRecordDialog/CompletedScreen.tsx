import React from 'react';
import Text from '@/components/Text';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';

export default function DecisionScreen() {
  return (
    <>
      <View style={styles.greenBackground}>
        <View style={styles.contentContainer}>
          <ThemedText type="defaultSemiBold" style={styles.headerText}>
            Profil wurde erstellt!
          </ThemedText>
          <Text style={styles.instructionText}>
            Das Gesundheitsprofil deines Vierbeiners ist eingerichtet. Alle
            weiteren wandelbaren Eintragungen erfolgen in der Gesundheitsakte.
          </Text>
          <View style={styles.dotContainerContainer}>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{ width: 20 }}
              />
              <Text style={styles.stepsText}>Behandlung mit Verlauf</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{ width: 20 }}
              />
              <Text style={styles.stepsText}>Parasitenschutz</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{ width: 20 }}
              />
              <Text style={styles.stepsText}>Gewicht</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{ width: 20 }}
              />
              <Text style={styles.stepsText}>Läufigkeit bei Hündinnen</Text>
            </View>
          </View>
        </View>
        <View style={styles.continueButtonContainer}>
          <Button
            title={'SPEICHERN & BEENDEN'}
            onPress={() => router.navigate('/')}
            variant="tertiary"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 17,
    height: 17,
    borderRadius: 17,
    borderColor: 'white',
    borderWidth: 2.5,
    borderStyle: 'dotted',
    backgroundColor: Colors.light.lightGreen,
    marginHorizontal: 5,
    marginVertical: 0,
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  dotContainerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12.5,
    marginTop: '8%',
  },
  greenBackground: {
    backgroundColor: Colors.light.vitalGreen,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    width: '70%',
    marginTop: '8%',
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 24,
    marginTop: '15%',
    color: Colors.light.black,
    lineHeight: 28,
  },
  stepsText: {
    fontSize: 18,
  },
  instructionText: {
    marginTop: '10%',
    color: Colors.light.darkGray,
    fontSize: 14,
  },
  continueButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '4%',
    bottom: '6%',
  },
  continueButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.light.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.light.white,
    fontWeight: '400',
    fontSize: 15,
    marginTop: -4,
  },
});
