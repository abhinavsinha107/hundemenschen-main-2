import React from 'react';
import Text from '@/components/Text';
import { Image, View, StyleSheet } from 'react-native';
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
            Profil in 6 Schritten vervollständigen.
          </ThemedText>
          <View style={styles.dotContainerContainer}>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrowGreen.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Schnellprofil</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Kennnummern</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Halter*In</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Zweitkontakt </Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Praxen & Behandelnde</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Medizinisches</Text>
            </View>
            <View style={styles.dotContainer}>
              <Image
                source={require('@/assets/images/doneArrow.png')}
                style={{
                  width: 20,
                  height: 16,
                  transform: [{ translateY: +2 }],
                }}
              />
              <Text style={styles.stepsText}>Verhalten & Allgemeines</Text>
            </View>
          </View>
          <Text style={styles.instructionText}>
            In der vollständigen Gesundheitsakte kannst du medizinische Daten
            deines Hundes Sammeln und durch Export im Notfall für Tierärzte oder
            Hundebetreuuer*innen zugänglich machen.
          </Text>
        </View>
        <View style={styles.continueButtonContainer}>
          <Button
            title={'JETZT VERVOLLSTÄNDIGEN'}
            onPress={() => router.navigate('../forms/dogidform')}
            variant="tertiary"
          />
        </View>
        <View style={styles.skipButtonContainer}>
          <Button
            title={'SPÄTER'}
            onPress={() => router.replace('./CompletedScreen')}
            variant="secondary"
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
    borderColor: Colors.light.white,
    borderWidth: 2.5,
    borderStyle: 'dotted',
    backgroundColor: Colors.light.lightGreen,
    marginHorizontal: 5,
    marginVertical: 0,
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dotContainerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
    color: Colors.light.darkGreen,
    lineHeight: 28,
    fontWeight: '700',
  },
  stepsText: {
    fontSize: 18,
  },
  instructionText: {
    marginTop: '10%',
    color: Colors.light.darkGray,
    fontSize: 14,
    textAlign: 'justify',
  },
  continueButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '4%',
    bottom: '13%',
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
  skipButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '4%',
    bottom: '6%',
  },
  skipButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.light.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    color: Colors.light.black,
    fontWeight: '400',
    fontSize: 15,
    marginTop: -4,
  },
});
