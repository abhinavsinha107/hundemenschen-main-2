import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from '@/components/Text';
import Button from '@/components/Button';
import FormWrapper from '../forms/formWrapper';

const WormTreatment: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);
  const [medication, setMedication] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [note, setNote] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSave = () => {
    console.log('Form Saved:', { date, medication, manufacturer, note });
    // Add form submission logic
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    hideDatePicker();
  };

  return (
    <FormWrapper
      footer={
        <Button title={'SPEICHERN'} onPress={handleSave} variant="tertiary" />
      }
      buttonStyle={{ width: 'unset' }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>WURMKUR</Text>
        <Text style={styles.subtitle}>
          Lege eine Wurmkur an um den {'\n'}Parasitenschutz immer aktuell zu
          halten.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Datum</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
            <Text style={{ color: date ? '#000' : '#999' }}>{date || ''}</Text>
            <Image
              source={require('@/assets/images/Frame.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.label}>Wurmmittel</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={medication}
            onChangeText={setMedication}
          />

          <Text style={styles.label}>Hersteller</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={manufacturer}
            onChangeText={setManufacturer}
          />

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
    tintColor: '#black',
  },
  saveButtonContainer: {
    marginBottom: 16,
  },
});

export default WormTreatment;
