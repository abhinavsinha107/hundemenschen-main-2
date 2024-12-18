import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { router } from 'expo-router';
import BlackScreenButtons from '@/components/blackScreenButtons';
import { Feather } from '@expo/vector-icons';

const details = [
  'Dreitakt, mit 1 oder 2 Schwebephasen',
  'Wir unterscheiden den Canter (langsamer Galopp), den normalen Galopp und den Renngalopp, der zwei Schwbephasen besitzt',
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
        showsVerticalScrollIndicator={false}
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
            galopp
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
          Mit Schwebephasen.
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
            Je nachdem welche Seite die Bewegung anführt, spricht man vom rechts
            oder links Galopp.Hierbei fußen nach der Schwebephase zunächst
            nacheinander die Hinterbeine auf. Im normalen rechts Galopp ist das
            beispielsweise erst links, dann rechts. Während vorne links dann
            aufsetzt, fußt hinten links schon wieder ab. Es folgt das Auffußen
            von vorne Rechts, während hinten rechts und anschließend vorne links
            abheben. Vor der Schwebephase berührt also nur noch vorne Rechts den
            Boden, bevor auch diese Pfote abhebt und die Phasen neu beginnen.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Image source={require('@/assets/images/screen9dog.png')} />
        </View>
      </ScrollView>
      <BlackScreenButtons
        disableBack={false}
        onContinueClick={() =>
          router.push({ pathname: '/medicalInfos/blackScreens/blackScreen10' })
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
    paddingBottom: 90,
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
