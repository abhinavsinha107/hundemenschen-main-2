import { View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Text from '@/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import useDogStore from '@/stores/dogStore';
import { VitalityboardCard } from '@/components/VitalityboardCard';

export default function Index() {
  const dog = useDogStore((state) => state.dog);
  return (
    <View style={styles.addDogView}>
      {dog ? (
        <>
          <View style={{ marginStart: 20 }}>
            <Text style={{ textTransform: 'uppercase' }}>Vitalityboard</Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {dog.call_name}
            </Text>
            <Text>Die Gesundheit immer im Blick.</Text>
          </View>
          <View style={{ height: 450 }}>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}
              >
                <VitalityboardCard dog={dog} type="image" />
                <VitalityboardCard dog={dog} />
                <VitalityboardCard dog={dog} />
                <VitalityboardCard dog={dog} />
                <VitalityboardCard dog={dog} />
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.titleHeader}>Willkommen</Text>
            <Text style={styles.subtitleHeader}>
              in deinem persönlichen Vitalityboard
            </Text>
          </View>

          <Button
            title={'+'}
            onPress={() =>
              router.navigate('/healthRecordDialog/AddPictureScreen')
            }
            isCircle
            variant="tertiary"
          />
          <Text style={styles.addDogSubtitle}>
            Füge einen Hund hinzu und richte die Gesundheitsakte ein.
          </Text>
        </View>
      )}

      <View style={styles.emergencyButton}>
        <TouchableHighlight onPress={() => {}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              gap: 4,
            }}
          >
            <Ionicons name="heart-outline" size={20} />
            <Text style={{ fontSize: 16 }}>ZUM NOTFALLWISSEN</Text>
            <Ionicons name="arrow-forward" size={20} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addDogView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: Colors.light.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  titleHeader: {
    color: Colors.light.vitalGreen,
    fontSize: 30,
  },
  subtitleHeader: {
    fontSize: 20,
  },
  emergencyButton: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    height: 50,
    marginBottom: 20,
    padding: 12,
    width: '90%',
    borderRadius: 16,
    backgroundColor: Colors.light.vitalGreen,
  },
  addDogSubtitle: {
    textAlign: 'center',
    width: '75%',
  },
});
