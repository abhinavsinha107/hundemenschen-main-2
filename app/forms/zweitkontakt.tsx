import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';
import Text from '@/components/Text';
import useContactStore from '@/stores/contactStore';

const ZweitkontaktForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [secondaryNumber, setSecondaryNumber] = useState('');
  const [note, setNote] = useState('');
  const { secondaryContact, createSecondaryContact, setSecondaryContact } =
    useContactStore();

  useEffect(() => {
    secondaryContact?.first_name && setFirstName(secondaryContact.first_name);
    secondaryContact?.last_name && setLastName(secondaryContact.last_name);
    secondaryContact?.mobile && setMobileNumber(secondaryContact.mobile);
    secondaryContact?.secondary_phone &&
      setSecondaryNumber(secondaryContact.secondary_phone);
    secondaryContact?.notes && setNote(secondaryContact.notes);
  }, [secondaryContact]);

  const saveIsSkipButton = !firstName;

  const newContactObject = {
    first_name: firstName,
    last_name: lastName,
    gender: 'd',
    mobile: mobileNumber,
    secondary_phone: secondaryNumber,
    notes: note,
  };

  const goToPraxenForm = () => {
    if (!saveIsSkipButton) {
      // eslint-disable-next-line no-unused-expressions
      !secondaryContact
        ? createSecondaryContact(newContactObject)
        : setSecondaryContact({ ...secondaryContact, ...newContactObject });
    }

    router.navigate('./praxenform');
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
            title={saveIsSkipButton ? 'ÜBERSPRINGEN' : 'WEITER'}
            variant="tertiary"
            onPress={goToPraxenForm}
          />
        </View>
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ZWEITKONTAKT</Text>
        <Text style={styles.sectionDescription}>
          Hier hast du die Möglichkeit, eine weitere{'\n'}Kontaktperson
          anzugeben.
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Anmerkung oder weitere Kontaktmöglichkeit
        </Text>
        <TextInput
          placeholder=""
          style={styles.inputFull}
          value={note}
          onChangeText={setNote}
        />
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    backgroundColor: Colors.light.white,
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
    padding: 12,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: Colors.light.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.darkGray,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonText: {
    color: Colors.light.darkGray,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nextButton: {
    backgroundColor: Colors.light.darkGray,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default ZweitkontaktForm;
