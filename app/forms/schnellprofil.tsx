import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import { CheckBox } from 'react-native-elements';
import { router } from 'expo-router';
import useDogStore from '@/stores/dogStore';
import { useImageDataContext } from '@/hooks/ImageDataContext';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import FormWrapper from './formWrapper';

const QuickProfileForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<string>('');
  const [isEstimated, setIsEstimated] = useState(false);
  const [isUnknownBirthDate, setIsUnknownBirthDate] = useState(false);
  const [isSterilized, setIsSterilized] = useState(false);
  const [breed, setBreed] = useState('');
  const [isBreedKnown, setIsBreedKnown] = useState(true);
  const [isMixedBreed, setIsMixedBreed] = useState(false);
  const { dog, createNewDog, setDog } = useDogStore();
  const { imageData } = useImageDataContext();

  useEffect(() => {
    dog?.full_name && setFullName(dog.full_name);
    dog?.call_name && setNickname(dog.call_name);
    dog?.birthday && setBirthDate(dog.birthday.toDateString());
    dog?.gender && setGender(dog.gender);
    dog?.estimated_birthday && setIsEstimated(dog.estimated_birthday);
    dog?.birthday_unknown && setIsUnknownBirthDate(dog.birthday_unknown);
    dog?.neutered && setIsSterilized(dog.neutered);
    dog?.breed && setBreed(dog.breed);
    dog?.breed_unknown && setIsBreedKnown(!dog.breed_unknown);
    dog?.mixed_breed && setIsMixedBreed(dog.mixed_breed);
  }, [dog]);

  const saveIsDisabled = nickname.trim() === '' || breed.trim() === '';
  const newDogObject = {
    full_name: fullName,
    call_name: nickname ?? null,
    gender: gender,
    neutered: isSterilized,
    birthday: birthDate ? new Date(birthDate) : null,
    estimated_birthday: isEstimated,
    breed: breed ?? null,
    mixed_breed: isMixedBreed,
    breed_unknown: !isBreedKnown,
    image: dog?.image ?? imageData ?? null,
  };

  const handleSave = async () => {
    if (!saveIsDisabled) {
      // eslint-disable-next-line no-unused-expressions
      !dog
        ? await createNewDog(newDogObject)
        : setDog({ ...dog, ...newDogObject });
    }
    router.navigate('../healthRecordDialog/DecisionScreen');
  };

  return (
    <FormWrapper
      footer={
        <Button
          title={'SCHNELLPROFIL SPEICHERN'}
          onPress={handleSave}
          disabled={saveIsDisabled}
          variant="tertiary"
        />
      }
      buttonStyle={{ alignSelf: 'flex-end', marginTop: 30 }}
    >
      <View>
        <Text style={styles.sectionTitle}>HUNDEDATEN</Text>
        <Text style={styles.sectionDescription}>
          Lege eine Gesundheitsakte mit den {'\n'}wichtigsten Informationen an.
        </Text>
      </View>

      <Text style={styles.label}>Vollständiger Name</Text>
      <TextInput
        placeholder=""
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Rufname*</Text>
      <TextInput
        placeholder=""
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />

      <Text style={styles.label}>Geburtsdatum</Text>
      <TextInput
        placeholder=""
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />

      <View style={styles.checkBoxRow}>
        <CheckBox
          checked={isEstimated}
          onPress={() => setIsEstimated(!isEstimated)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>geschätzt</Text>

        <CheckBox
          checked={isUnknownBirthDate}
          onPress={() => setIsUnknownBirthDate(!isUnknownBirthDate)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>unbekannt</Text>
      </View>

      <Text style={styles.label}>Geschlecht*</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            gender === 'Hündin' && styles.selectedButton,
          ]}
          onPress={() => setGender('Hündin')}
        >
          <Text style={styles.optionText}>Hündin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            gender === 'Rüde' && styles.selectedButton,
          ]}
          onPress={() => setGender('Rüde')}
        >
          <Text style={styles.optionText}>Rüde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            gender === 'unbekannt' && styles.selectedButton,
          ]}
          onPress={() => setGender('unbekannt')}
        >
          <Text style={styles.optionText}>unbekannt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkBoxRow}>
        <CheckBox
          checked={isSterilized}
          onPress={() => setIsSterilized(!isSterilized)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>kastriert/sterilisiert</Text>

        <CheckBox
          checked={isBreedKnown}
          onPress={() => setIsBreedKnown(!isBreedKnown)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>Zuchthund</Text>
      </View>

      <Text style={styles.label}>Hunderasse*</Text>
      <TextInput
        placeholder=""
        value={breed}
        onChangeText={setBreed}
        style={styles.input}
      />

      <View style={styles.checkBoxRow}>
        <CheckBox
          checked={isMixedBreed}
          onPress={() => setIsMixedBreed(!isMixedBreed)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>Mischling</Text>

        <CheckBox
          checked={!isBreedKnown}
          onPress={() => setIsBreedKnown(!isBreedKnown)}
          checkedColor={Colors.light.mediumGreen}
          uncheckedColor={Colors.light.mediumGreen}
        />
        <Text style={styles.checkboxLabel}>Rasse nicht bekannt</Text>
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20,
    marginBottom: -10,
  },
  optionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 5,
  },
  selectedButton: {
    backgroundColor: Colors.light.vitalGreen,
    borderColor: Colors.light.vitalGreen,
  },
  optionText: {
    fontSize: 16,
  },
  checkboxLabel: {
    marginLeft: -8,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: Colors.light.darkGray,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  disabledButton: {
    backgroundColor: Colors.light.lightGray,
  },
  saveButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuickProfileForm;
