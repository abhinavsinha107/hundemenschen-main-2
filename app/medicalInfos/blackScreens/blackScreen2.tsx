import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { router } from 'expo-router';
import BlackScreenButtons from '@/components/blackScreenButtons';
import BlackScreenHeroSection from '@/components/blackScreenHeroSection';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 55, paddingHorizontal: 30 }}>
        <BlackScreenHeroSection heading="Warum" subHeading="beobachten?" />
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              fontFamily: 'Brother1816Printed',
              fontWeight: '400',
              fontSize: 14,
              lineHeight: 20,
              color: '#fff',
            }}
          >
            Hunde zeigen Unwohlsein und Schmerzen anders als Menschen, daher
            sind wir Hundemenschen in der Verantwortung, unseren Blick dafür zu
            schulen um Veränderungen wahrzunehmen.
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View>
            <Image
              source={require('@/assets/images/question.png')}
              style={{ alignSelf: 'center' }}
            />
          </View>
          <Text style={styles.question}>
            Dieser Check Up ersetzt in keinster Weise eine Vorstellung des
            Tieres bei Tierärzt*innen oder anderen Fachleuten.
          </Text>
        </View>
        <View style={{ marginLeft: 25 }}>
          <Text
            style={{
              fontFamily: 'Brother1816Printed',
              fontWeight: '300',
              fontSize: 13,
              lineHeight: 15,
              color: '#fff',
            }}
          >
            Viel mehr ergänzt er die Anamnese, durch die Beobachtung des Hundes
            in seiner gewohnten Umgebung. Der Hundemensch kennt seinen Hund am
            besten und erlebt ihn täglich. Er stellt hier eine bedeutende
            Schnittstelle dar, um Auffälligkeiten zu erkennen und diese in der
            Folge fachlich untersuchen zu lassen.
          </Text>
        </View>
      </View>
      <BlackScreenButtons
        disableBack={false}
        onContinueClick={() =>
          router.push({ pathname: '/medicalInfos/blackScreens/blackScreen3' })
        }
      />
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
