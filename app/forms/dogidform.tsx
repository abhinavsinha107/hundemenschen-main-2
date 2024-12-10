import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import { router } from 'expo-router';
import useDogStore from '@/stores/dogStore';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';

const DogIdentificationForm = () => {
  const [chipNumber, setChipNumber] = useState('');
  const [chipDate, setChipDate] = useState(new Date());
  const [chipLocation, setChipLocation] = useState('');
  const [petPassportNumber, setPetPassportNumber] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [tassoNumber, setTassoNumber] = useState('');
  const [taxMarkNumber, setTaxMarkNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [insurance, setInsurance] = useState<string | null>(null);
  const [insuranceDetails, setInsuranceDetails] = useState('');
  const [showChipPicker, setShowChipPicker] = useState(false);

  const { dog, setDog } = useDogStore();

  useEffect(() => {
    dog?.chip_number && setChipNumber(dog.chip_number);
    dog?.chip_date && setChipDate(dog.chip_date);
    dog?.chip_location && setChipLocation(dog.chip_location);
    dog?.pet_passport_number && setPetPassportNumber(dog.pet_passport_number);
    dog?.origin_country && setCountryOfOrigin(dog.origin_country);
    dog?.tasso_number && setTassoNumber(dog.tasso_number);
    dog?.tax_number && setTaxMarkNumber(dog.tax_number);
    dog?.identification_notes && setNotes(dog.identification_notes);
    dog?.has_pet_insurance &&
      setInsurance(dog.has_pet_insurance ? 'ja' : 'nein');
    dog?.insurance_name && setInsuranceDetails(dog.insurance_name);
  }, [dog]);

  const newDogObject = {
    chip_number: chipNumber,
    chip_date: chipDate,
    chip_location: chipLocation,
    pet_passport_number: petPassportNumber,
    origin_country: countryOfOrigin,
    tasso_number: tassoNumber,
    tax_number: taxMarkNumber,
    identification_notes: notes,
    has_pet_insurance: insurance === 'ja' ? true : false,
    insurance_name: insuranceDetails,
  };

  const onChipDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || chipDate;
    setShowChipPicker(false);
    setChipDate(currentDate);
  };

  const goToContactDataForm = () => {
    dog &&
      setDog({
        ...dog,
        ...newDogObject,
      });
    router.navigate('./contactdataform');
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
            onPress={goToContactDataForm}
          />
        </View>
      }
    >
      <Text style={styles.sectionTitle}>KENNNUMMERN</Text>
      <Text style={styles.description}>
        Behalte den Überblick über jegliche {'\n'}Identifikationsnummern deines
        Hundes.
      </Text>

      {/* Chipnummer und Chipdatum */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Chipnummer (15-stellig)</Text>
          <TextInput
            value={chipNumber}
            onChangeText={setChipNumber}
            placeholder=""
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.dateField}>
            <Text style={styles.label}>Chipdatum</Text>
            <TouchableOpacity
              onPress={() => setShowChipPicker(true)}
              style={styles.dateInput}
            >
              <Text style={styles.dateText}>
                {chipDate.toLocaleDateString()}
              </Text>
              <FontAwesome
                name="calendar"
                size={16}
                color={Colors.light.darkGray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stelle des Chips */}
      <View style={{ ...styles.inputContainer, flex: 0 }}>
        <Text style={styles.label}>Stelle des Chips</Text>
        <TextInput
          value={chipLocation}
          onChangeText={setChipLocation}
          placeholder=""
          style={styles.inputFull}
        />
      </View>

      {/* Heimtierausweisnummer und Herkunftsland */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Heimtierausweisnummer</Text>
          <TextInput
            value={petPassportNumber}
            onChangeText={setPetPassportNumber}
            placeholder=""
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Herkunftsland</Text>
          <TextInput
            value={countryOfOrigin}
            onChangeText={setCountryOfOrigin}
            placeholder=""
            style={styles.input}
          />
        </View>
      </View>

      {/* Tasso-Nummer und Steuermarken-Nummer */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tasso-Nummer</Text>
          <TextInput
            value={tassoNumber}
            onChangeText={setTassoNumber}
            placeholder=""
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Steuermarkennummer</Text>
          <TextInput
            value={taxMarkNumber}
            onChangeText={setTaxMarkNumber}
            placeholder=""
            style={styles.input}
          />
        </View>
      </View>

      {/* Anmerkungen */}
      <View style={{ ...styles.inputContainer, flex: 0 }}>
        <Text style={styles.label}>Eigene Anmerkung</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder=""
          style={styles.inputFull}
        />
      </View>

      {/* Tierkrankenversicherung */}
      <View>
        <Text style={styles.label}>
          Besteht eine Tierkrankenversicherung? Welche?
        </Text>
        <View style={styles.insuranceContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              insurance === 'ja' && styles.selectedButton,
            ]}
            onPress={() => setInsurance('ja')}
          >
            <Text
              style={[
                styles.optionText,
                insurance === 'ja' && styles.selectedText,
              ]}
            >
              ja
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              insurance === 'nein' && styles.selectedButton,
            ]}
            onPress={() => setInsurance('nein')}
          >
            <Text
              style={[
                styles.optionText,
                insurance === 'nein' && styles.selectedText,
              ]}
            >
              nein
            </Text>
          </TouchableOpacity>
          {insurance === 'ja' && (
            <TextInput
              value={insuranceDetails}
              onChangeText={setInsuranceDetails}
              placeholder="Versicherungsdetails"
              style={styles.input}
            />
          )}
        </View>
      </View>
      {showChipPicker && (
        <DateTimePicker
          value={chipDate}
          mode="date"
          display="default"
          onChange={onChipDateChange}
        />
      )}
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.darkGray,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: Colors.light.vitalGreen,
    borderColor: Colors.light.vitalGreen,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light.black,
  },
  selectedText: {
    color: Colors.light.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: Colors.light.white, // White background color
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.darkGray, // Dark gray border
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonText: {
    color: Colors.light.darkGray, // Dark gray text color
    fontSize: 16,
    fontWeight: '700', // Bold text
    textTransform: 'uppercase',
  },
  nextButton: {
    backgroundColor: Colors.light.darkGray, // Dark gray background color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: Colors.light.white, // White text color
    fontSize: 16,
    fontWeight: '700', // Bold text
    textTransform: 'uppercase',
  },
  dateField: {
    flex: 1,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: Colors.light.mediumGreen,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
});

export default DogIdentificationForm;
