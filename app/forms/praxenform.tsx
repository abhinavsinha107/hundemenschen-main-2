import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import { CheckBox } from 'react-native-elements';
import { router } from 'expo-router';
import useVetStore from '@/stores/vetStore';
import { Colors } from '@/constants/Colors';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';
import { VetPreviewElement } from '@/components/vetPreviewElement';

const ClinicDataForm = () => {
  const [isPrimaryVet, setIsPrimaryVet] = useState(false);
  const [clinicName, setClinicName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [country, setCountry] = useState('');
  const [addressExtra, setAddressExtra] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const { vets, createNewVet } = useVetStore();
  const vetIsAvailable = vets.length > 0;

  // useEffect(() => {
  //   vet?.origin_veterinary_practice !== undefined &&
  //     setIsPrimaryVet(!!vet.origin_veterinary_practice);
  //   vet?.practice_name && setClinicName(vet.practice_name);
  //   vet?.vet_name && setDoctorName(vet.vet_name);
  //   vet?.zip_code && setPostalCode(vet.zip_code);
  //   vet?.city && setCity(vet.city);
  //   vet?.street && setStreet(vet.street);
  //   vet?.house_number && setHouseNumber(vet.house_number);
  //   vet?.address_additional_info &&
  //     setAddressExtra(vet.address_additional_info);
  //   vet?.mobile && setPhoneNumber(vet.mobile);
  //   vet?.email && setEmail(vet.email);
  //   vet?.notes && setNote(vet.notes);
  // }, [vet]);

  const newVetObject = {
    origin_veterinary_practice: isPrimaryVet,
    practice_name: clinicName,
    vet_name: doctorName,
    zip_code: postalCode,
    city: city,
    street: street,
    house_number: houseNumber,
    address_additional_info: addressExtra,
    mobile: phoneNumber,
    email: email,
    notes: note,
  };

  const addVet = () => {
    if (clinicName) {
      // eslint-disable-next-line no-unused-expressions
      !vets ? createNewVet(newVetObject) : createNewVet(newVetObject);

      // reset all states
      setIsPrimaryVet(false);
      setClinicName('');
      setDoctorName('');
      setPostalCode('');
      setCity('');
      setStreet('');
      setHouseNumber('');
      setCountry('');
      setAddressExtra('');
      setPhoneNumber('');
      setEmail('');
      setNote('');
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
            title={!vetIsAvailable ? 'ÜBERSPRINGEN' : 'WEITER'}
            variant="tertiary"
            onPress={() => router.navigate('./medizinischesform')}
          />
        </View>
      }
    >
      <Text
        style={[styles.sectionTitle, vetIsAvailable && { marginBottom: 10 }]}
      >
        {vetIsAvailable ? 'BEREITS ANGELEGTE KONTAKTE' : 'PRAXEN & BEHANDELNDE'}
      </Text>
      {!vetIsAvailable ? (
        <Text style={styles.subtitleText}>
          Hinterlege hier alle Behandelnde deines {'\n'}Hundes, um die Kontakte
          im Notfall zur Hand {'\n'}zu haben.
        </Text>
      ) : (
        <>
          {vets &&
            vets.map((currVet, index) => (
              <VetPreviewElement
                key={index}
                number={(index + 1).toString()}
                title={currVet?.practice_name ?? ''}
                isPrimaryVet={!!currVet?.origin_veterinary_practice}
              />
            ))}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
            WEITERE PRAXEN &{'\n'}BEHANDELNDE ANLEGEN
          </Text>
        </>
      )}
      <View>
        <CheckBox
          title="Stammpraxis"
          checked={isPrimaryVet}
          onPress={() => setIsPrimaryVet(!isPrimaryVet)}
          containerStyle={[
            styles.checkboxContainer,
            vetIsAvailable && { marginTop: 20 },
          ]}
          textStyle={styles.checkboxText}
          uncheckedColor={Colors.light.darkGreen}
          checkedColor={Colors.light.darkGreen}
        />

        <Text style={styles.label}>Praxisname/ Bezeichnung*</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          value={clinicName}
          onChangeText={setClinicName}
        />

        <Text style={styles.label}>Behandelnde*r</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          value={doctorName}
          onChangeText={setDoctorName}
        />

        {/* PLZ and Ort */}
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

        {/* Straße and Hausnummer */}
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

        {/* Land and Adresszusatz */}
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

        <Text style={styles.label}>Telefonnummer</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>E-mailadresse</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Anmerkung</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          value={note}
          onChangeText={setNote}
        />
      </View>
      {/* Add More Button */}
      <View style={styles.addMoreContainer}>
        <Text style={styles.addMoreText}>Weitere Behandelnde eintragen</Text>
        <Button
          title={'+'}
          onPress={addVet}
          isCircle
          isSmalll
          variant="tertiary"
        />
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.light.darkGray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 30,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    alignItems: 'flex-start',
    marginLeft: 0,
    marginBottom: 0,
  },
  checkboxText: {
    color: Colors.light.darkGray,
    fontSize: 16,
    fontWeight: 'regular',
  },
  label: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  addMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
    marginRight: 10,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
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
});

export default ClinicDataForm;
