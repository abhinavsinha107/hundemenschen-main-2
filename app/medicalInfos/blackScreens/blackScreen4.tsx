import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { router } from 'expo-router';
import BlackScreenButtons from '@/components/blackScreenButtons';
import BlackScreenHeroSection from '@/components/blackScreenHeroSection';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 55, paddingHorizontal: 30 }}>
        <BlackScreenHeroSection heading="Step 1" subHeading="mit dem Hund" />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.details}>
            Rufe deinen Hund zu dir und nimm dir etwas Zeit und Ruhe um die
            folgenden Fragestellungen zu prüfen. Wenn du deinen Hund dafür
            anfassen musst, beachte dabei stets die Signale die er dir sendet
            und gehe nur so weit, wie er das zulässt.
          </Text>
          <Text style={styles.details}>
            Sehe diese kleine Einheit als Gemeinschaftsübung an und stelle den
            Spaß für deinen Vierbeiner in den Vordergrund.
          </Text>
          <Text style={styles.details}>
            Sollte etwas nicht klappen, nimm es zum Anlass, die Probleme zu
            notieren.
          </Text>
        </View>
      </View>
      <BlackScreenButtons
        disableBack={false}
        onContinueClick={() =>
          router.push({ pathname: '/medicalInfos/blackScreens/blackScreen5' })
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
  details: {
    fontFamily: 'Brother1816Printed',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#fff',
    marginBottom: 20,
  },
});
