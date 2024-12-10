import { router } from 'expo-router';
import Text from '@/components/Text';
import { View, StyleSheet } from 'react-native';
import { Database } from '@/db/database';
import { Contact, Dog, GeneralInfo, MedicalInfo, Vet } from '@/db/schema';
import migrations from '@/drizzle/migrations';
import useDogStore from '@/stores/dogStore';
import useCheckupStore from '@/stores/checkupStore';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import * as Font from 'expo-font';
import useContactStore from '@/stores/contactStore';
import useGeneralInfoStore from '@/stores/generalInfoStore';
import useMedicalInfoStore from '@/stores/medicalInfoStore';
import useVetStore from '@/stores/vetStore';
import useWeightStore from '@/stores/weightStore';

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Arkipelago: require('@/assets/fonts/Arkipelago.otf'),
      Brother1816: require('@/assets/fonts/Brother1816.ttf'),
      Brother1816Printed: require('@/assets/fonts/Brother1816Printed.ttf'),
      Brother1816Printed700: require('@/assets/fonts/Brother1816Printed700.ttf'),
    }).then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const { success, error } = useMigrations(Database.db, migrations);

  const { dog, setDog } = useDogStore();
  const { setPrimaryContact, setSecondaryContact } = useContactStore();
  const { setGeneralInfo } = useGeneralInfoStore();
  const { setMedicalInfo } = useMedicalInfoStore();
  const { setVets } = useVetStore();
  const fetchCheckups = useCheckupStore((state) => state.fetchCheckups);
  const fetchWeights = useWeightStore((state) => state.fetchWeights);

  useEffect(() => {
    if (!success) return;

    Database.getPrimaryDog().then((dog: Dog | null) => setDog(dog));
    Database.getPrimaryContact().then((contact: Contact | null) =>
      setPrimaryContact(contact),
    );
    Database.getSecondaryContact().then((contact: Contact | null) =>
      setSecondaryContact(contact),
    );
    Database.getPrimaryGeneralInfo().then((generalInfo: GeneralInfo | null) =>
      setGeneralInfo(generalInfo),
    );
    Database.getPrimaryMedicalInfo().then((medicalInfo: MedicalInfo | null) =>
      setMedicalInfo(medicalInfo),
    );
    Database.getAllVets().then((vets: Vet[]) => setVets(vets));
  }, [
    success,
    setDog,
    setPrimaryContact,
    setSecondaryContact,
    setGeneralInfo,
    setMedicalInfo,
    setVets,
  ]);

  useEffect(() => {
    if (dog) {
      console.log('Dog state updated:', dog);
    }
  }, [dog]); // This will run whenever `dog` is updated.

  // Fetch checkups when dog changes
  useEffect(() => {
    if (dog) {
      fetchCheckups(dog.id);
      fetchWeights(dog.id);
    }
  }, [dog, fetchCheckups, fetchWeights]);

  if (!fontsLoaded) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Add dog dialog"
        onPress={() => router.push({ pathname: '/startup' })}
      />
      <Button
        title="Go to Profile"
        onPress={() => router.push({ pathname: '/profile' })}
        //disabled={!dog}
        variant={dog ? 'secondary' : 'primary'}
      />
      <Button
        title="Go to DogInfo"
        onPress={() => router.push({ pathname: '/info' })}
        variant={dog ? 'secondary' : 'primary'}
      />
      <Button
        title="Go to Health Dashboard"
        onPress={() => router.push({ pathname: '/health' })}
        variant={dog ? 'secondary' : 'primary'}
      />
      <Button
        title="View Checkups"
        onPress={() => router.push({ pathname: '/health/checkup' })}
        disabled={!dog}
        variant="secondary"
      />
      <Button
        title="View Parasite Protection"
        onPress={() =>
          router.push({ pathname: '/parasiteprotection/allEntriesScreen' })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
