import { Colors } from '@/constants/Colors';
import useGeneralInfoStore from '@/stores/generalInfoStore';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { CheckBox } from 'react-native-elements';

const GeneralInfoScreen = () => {
  const [behaviorNotes, setBehaviorNotes] = useState('');
  const [aggressionWarning, setAggressionWarning] = useState(false);
  const [housingType, setHousingType] = useState('unterschiedlich');
  const [dailyNotes, setDailyNotes] = useState('');
  const [foodType, setFoodType] = useState('');
  const [foodBrand, setFoodBrand] = useState('');
  const [foodUnit, setFoodUnit] = useState('');
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [foodNotes, setFoodNotes] = useState('');

  const { generalInfo, createNewGeneralInfo, setGeneralInfo } =
    useGeneralInfoStore();

  useEffect(() => {
    generalInfo?.everyday_life_notes &&
      setBehaviorNotes(generalInfo.everyday_life_notes);
    generalInfo?.caution_with_aggression &&
      setAggressionWarning(generalInfo.caution_with_aggression);
    generalInfo?.behavior_character &&
      setDailyNotes(generalInfo.behavior_character);
    generalInfo?.living_environment &&
      setHousingType(generalInfo.living_environment);
    generalInfo?.feed_type && setFoodType(generalInfo.feed_type);
    generalInfo?.feed_manufacturer &&
      setFoodBrand(generalInfo.feed_manufacturer);
    generalInfo?.feed_quantity && setFoodUnit(generalInfo.feed_quantity);
    generalInfo?.feed_notes && setFoodNotes(generalInfo.feed_notes);
    generalInfo?.feed_ingredients &&
      setSelectedFoodTypes(generalInfo.feed_ingredients.split(','));
  }, [generalInfo]);

  const foodOptions = [
    'Trockenfutter',
    'Nassfutter',
    'BARF',
    'fertig BARF',
    'Pulver',
    'Frisch gekochtes',
    'Sonstiges',
  ];

  const toggleFoodType = (type: string) => {
    if (selectedFoodTypes.includes(type)) {
      setSelectedFoodTypes(selectedFoodTypes.filter((item) => item !== type));
    } else {
      setSelectedFoodTypes([...selectedFoodTypes, type]);
    }
  };

  const newGeneralInfoObject = {
    caution_with_aggression: aggressionWarning,
    behavior_character: behaviorNotes,
    living_environment: housingType,
    everyday_life_notes: dailyNotes,
    feed_ingredients: foodType,
    feed_manufacturer: foodBrand,
    feed_quantity: foodUnit,
    feed_type: selectedFoodTypes.join(', '),
    feed_notes: foodNotes,
  };

  const goToCompletedScreen = () => {
    // eslint-disable-next-line no-unused-expressions
    !generalInfo
      ? createNewGeneralInfo(newGeneralInfoObject)
      : setGeneralInfo({ ...generalInfo, ...newGeneralInfoObject });

    router.navigate('../healthRecordDialog/CompletedScreen');
  };

  return (
    <FormWrapper
      footer={
        <View style={styles.footer}>
          <Button
            title={'ZURÜCK'}
            variant="secondary"
            onPress={() => router.back()}
          />
          <Button
            title={'WEITER'}
            variant="tertiary"
            onPress={goToCompletedScreen}
          />
        </View>
      }
    >
      <Text style={styles.header}>ALLGEMEIN</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur{'\n'}sadipscing elitr, sed diam.
      </Text>

      <Text style={styles.label}>
        Allgemeine Angaben zu Verhalten und Charakter
      </Text>
      <TextInput
        style={styles.input}
        value={behaviorNotes}
        onChangeText={setBehaviorNotes}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={aggressionWarning}
          onPress={() => setAggressionWarning(!aggressionWarning)}
          uncheckedColor={Colors.light.darkGreen}
          checkedColor={Colors.light.darkGreen}
        />
        <Text style={styles.checkboxLabel}>
          Es ist Vorsicht bei der Behandlung geboten.{'\n'}Der Hundreagiert u.U.
          aggresiv.
        </Text>
      </View>

      <Text style={styles.label}>Wo wird der Hund gehalten?</Text>
      <View style={styles.buttonGroup}>
        {['drinnen', 'draußen', 'unterschiedlich'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              housingType === option && styles.selectedButton,
            ]}
            onPress={() => setHousingType(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Weitere Anmerkungen zum Alltag</Text>
      <TextInput
        style={styles.input}
        value={dailyNotes}
        onChangeText={setDailyNotes}
      />
      <View style={styles.line} />
      <Text style={styles.label}>Futtersorte</Text>
      <TextInput
        style={styles.input}
        value={foodType}
        onChangeText={setFoodType}
      />

      <Text style={styles.label}>Futterhersteller</Text>
      <TextInput
        style={styles.input}
        value={foodBrand}
        onChangeText={setFoodBrand}
      />

      <Text style={styles.label}>Einheit</Text>
      <TextInput
        style={styles.input}
        value={foodUnit}
        onChangeText={setFoodUnit}
      />

      <Text style={styles.label}>
        Art des Futters (mehrfachauswahl möglich)
      </Text>
      <View style={styles.buttonGroup}>
        {foodOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedFoodTypes.includes(option) && styles.selectedButton,
            ]}
            onPress={() => toggleFoodType(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Anmerkungen zum Futter</Text>
      <TextInput
        style={styles.input}
        value={foodNotes}
        onChangeText={setFoodNotes}
      />
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.white,
    paddingTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
  },
  selectedButton: {
    backgroundColor: Colors.light.vitalGreen,
    borderColor: Colors.light.vitalGreen,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: -5,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  line: {
    height: 2,
    backgroundColor: Colors.light.mediumGreen,
    width: '25%',
    marginTop: 32,
    marginBottom: 16,
  },
});

export default GeneralInfoScreen;
