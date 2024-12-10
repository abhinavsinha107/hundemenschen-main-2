import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import { router } from 'expo-router';
import useContactStore from '@/stores/contactStore';
import { Colors } from '@/constants/Colors';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';

const ContactDataForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [addressExtra, setAddressExtra] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [secondaryNumber, setSecondaryNumber] = useState('');
  const { primaryContact, createPrimaryContact, setPrimaryContact } =
    useContactStore();

  useEffect(() => {
    primaryContact?.first_name && setFirstName(primaryContact.first_name);
    primaryContact?.last_name && setLastName(primaryContact.last_name);
    primaryContact?.gender && setGender(primaryContact.gender);
    primaryContact?.street && setStreet(primaryContact.street);
    primaryContact?.house_number && setHouseNumber(primaryContact.house_number);
    primaryContact?.zip_code && setPostalCode(primaryContact.zip_code);
    primaryContact?.city && setCity(primaryContact.city);
    primaryContact?.country && setCountry(primaryContact.country);
    primaryContact?.address_additional_info &&
      setAddressExtra(primaryContact.address_additional_info);
    primaryContact?.mobile && setMobileNumber(primaryContact.mobile);
    primaryContact?.secondary_phone &&
      setSecondaryNumber(primaryContact.secondary_phone);
  }, [primaryContact]);

  const saveIsDisabled = !gender || !firstName;

  const newContactObject = {
    first_name: firstName,
    last_name: lastName,
    gender: gender ?? '',
    street: street,
    house_number: houseNumber,
    zip_code: postalCode,
    city: city,
    country: country,
    address_additional_info: addressExtra,
    mobile: mobileNumber,
    secondary_phone: secondaryNumber,
  };

  const goToZweitKontaktForm = () => {
    if (!saveIsDisabled) {
      // eslint-disable-next-line no-unused-expressions
      !primaryContact
        ? createPrimaryContact(newContactObject)
        : setPrimaryContact({ ...primaryContact, ...newContactObject });
      router.navigate('./zweitkontakt');
    }
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
            disabled={saveIsDisabled}
            onPress={goToZweitKontaktForm}
          />
        </View>
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HALTER*IN</Text>
        <Text style={styles.sectionDescription}>
          Trage hier deine Daten ein, damit du sie bei{'\n'}Bedarf an
          Tierarzt*innen weitergeben kannst.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vorname*</Text>
        <TextInput
          placeholder=""
          style={styles.inputFull}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nachname</Text>
        <TextInput
          placeholder=""
          style={styles.inputFull}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <Text style={styles.label}> Geschlecht*</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'weiblich' && styles.genderButtonSelected,
          ]}
          onPress={() => setGender('weiblich')}
        >
          <Text style={styles.genderText}>weiblich</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'männlich' && styles.genderButtonSelected,
          ]}
          onPress={() => setGender('männlich')}
        >
          <Text style={styles.genderText}>männlich</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'divers' && styles.genderButtonSelected,
          ]}
          onPress={() => setGender('divers')}
        >
          <Text style={styles.genderText}>divers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Straße</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={street}
            onChangeText={setStreet}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hausnummer</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={houseNumber}
            onChangeText={setHouseNumber}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PLZ</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ort</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Land</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={country}
            onChangeText={setCountry}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adresszusatz</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={addressExtra}
            onChangeText={setAddressExtra}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobilnummer</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zweitnummer</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={secondaryNumber}
            onChangeText={setSecondaryNumber}
          />
        </View>
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    backgroundColor: Colors.light.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 24,
    marginVertical: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '700',
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.darkGray,
    marginBottom: 5,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    marginHorizontal: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderButtonSelected: {
    backgroundColor: Colors.light.vitalGreen,
    borderColor: Colors.light.vitalGreen,
  },
  genderText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
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
  disabledButton: {
    backgroundColor: Colors.light.lightGray,
  },
  nextButtonText: {
    color: Colors.light.white, // White text color
    fontSize: 16,
    fontWeight: '700', // Bold text
    textTransform: 'uppercase',
  },
});

export default ContactDataForm;
