import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { router } from 'expo-router';
import BlackScreenButtons from '@/components/blackScreenButtons';
import { Feather } from '@expo/vector-icons';

const details = [
  'Zweitakt, kann Schwebephase haben',
  'Die gleichseitigen Beinpaare bilden ein V',
  'Die Diagonalen Beinpaare sind diagonal zu einander',
];

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 35,
          paddingHorizontal: 30,
          borderWidth: 1,
          borderColor: '#fff',
          marginTop: 20,
          borderRadius: 14,
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: 'Brother1816Printed',
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 18,
              color: '#fff',
              letterSpacing: 1,
            }}
          >
            2.
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: 'Brother1816Printed',
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 18,
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            trab
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Brother1816Printed',
            fontWeight: '500',
            fontSize: 24,
            lineHeight: 25,
            marginTop: 20,
            color: '#C2DE4C',
          }}
        >
          Schwungvoller zweitakt.
        </Text>
        <View style={styles.detailsView}>
          {details.map((detail, index) => (
            <View key={index} style={styles.bulletContainer}>
              <Feather name="check" size={24} color="#C2DE4C" />
              <Text style={styles.bulletPoint}>{detail}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Brother1816Printed',
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 16,
              color: '#fff',
              marginBottom: 10,
            }}
          >
            Ist der Trab sehr schwungvoll, kann dieser auch eine Schwebephase
            haben, muss er aber nicht.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Image source={require('@/assets/images/screen8dog.png')} />
        </View>
      </ScrollView>
      <BlackScreenButtons
        disableBack={false}
        onContinueClick={() =>
          router.push({ pathname: '/medicalInfos/blackScreens/blackScreen9' })
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
  detailsView: {
    paddingVertical: 20,
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
});
