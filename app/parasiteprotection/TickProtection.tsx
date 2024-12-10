import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Text from '@/components/Text';
import Button from '@/components/Button';
import FormWrapper from '../forms/formWrapper';
import DatePickerInput from '@/components/DatePickerInput';

const TickProtection: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);
  const [medication, setMedication] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [dosageForm, setDosageForm] = useState(''); // For Darreichungsform
  const [effectDuration, setEffectDuration] = useState(''); // For Angegebene Wirkdauer
  const [effectUnit, setEffectUnit] = useState(''); // For Einheit wählen
  const [note, setNote] = useState('');

  const handleSave = () => {
    console.log('Form Saved:', {
      date,
      medication,
      manufacturer,
      dosageForm,
      effectDuration,
      effectUnit,
      note,
    });
    // Add form submission logic
  };

  return (
    <FormWrapper
      footer={
        <Button title={'SPEICHERN'} onPress={handleSave} variant="tertiary" />
      }
      buttonStyle={{ alignSelf: 'flex-end' }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>ZECKENSCHUTZ</Text>
        <Text style={styles.subtitle}>
          Trage hier das Antiparasiten-Mittel ein um {'\n'}den Parasitenschutz
          aktuell zu halten.
        </Text>

        <View style={styles.formContainer}>
          {/* Date Picker */}
          <DatePickerInput value={date} onChange={setDate} label="Datum" />

          {/* Medication Name */}
          <Text style={styles.label}>Name des Antiparasiten-Mittels</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={medication}
            onChangeText={setMedication}
          />

          {/* Manufacturer */}
          <Text style={styles.label}>Hersteller</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={manufacturer}
            onChangeText={setManufacturer}
          />

          {/* Dosage Form Dropdown */}
          <Text style={styles.label}>Darreichungsform</Text>
          <RNPickerSelect
            onValueChange={(value) => setDosageForm(value)}
            items={[
              { label: 'Tablette', value: 'Tablette' },
              { label: 'Flüssigkeit', value: 'Flüssigkeit' },
              { label: 'Gel', value: 'Gel' },
            ]}
            placeholder={{ label: 'wählen', value: null }}
            style={{
              inputAndroid: styles.dropdown,
              inputIOS: styles.dropdown,
            }}
          />

          {/* Effect Duration Row */}
          <Text style={styles.label}>Angegebene Wirkdauer</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder=""
              value={effectDuration}
              onChangeText={setEffectDuration}
              keyboardType="numeric"
            />
            <RNPickerSelect
              onValueChange={(value) => setEffectUnit(value)}
              items={[
                { label: 'Tage', value: 'Tage' },
                { label: 'Wochen', value: 'Wochen' },
                { label: 'Monate', value: 'Monate' },
              ]}
              placeholder={{ label: 'Einheit wählen', value: null }}
              style={{
                inputAndroid: styles.dropdown,
                inputIOS: styles.dropdown,
              }}
            />
          </View>

          {/* Additional Note */}
          <Text style={styles.label}>Eigene Anmerkung</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={note}
            onChangeText={setNote}
          />
        </View>
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#899E33',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#899E33',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#899E33',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfInput: {
    width: '48%',
  },
});

export default TickProtection;
