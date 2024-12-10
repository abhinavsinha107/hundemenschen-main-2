import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from '@/components/Text';
import Button from '@/components/Button';
import FormWrapper from '../forms/formWrapper';
import ZurueckButton from '@/components/ZurueckButton';
import WeiterButton from '@/components/WeiterButton';
import { router } from 'expo-router';

const WormTreatment: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);
  const [medication, setMedication] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [note, setNote] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedWorms, setSelectedWorms] = useState<string[]>([]); // Stores selected tabs
  const worms = [
    "Peitschenwürmer",
    "Bandwürmer",
    "Spulwürmer",
    "Hakenwürmer",
    "Herzwürmer",
    "Lungenwürmer",
    "Haarwürmer",
    "Leberegel",
    "Giardien",
    "Kokzidien",
  ];

  const toggleWormSelection = (worm: string) => {
    setSelectedWorms((prevSelected) =>
      prevSelected.includes(worm)
        ? prevSelected.filter((w) => w !== worm) // Remove if already selected
        : [...prevSelected, worm] // Add if not selected
    );
  };

  const handleSave = () => {
    console.log('Form Saved:', { date, medication, manufacturer, note });
    // Add form submission logic
  };
  const handleBackPress = () => {
    console.log('Zurück button pressed');
    // Add your logic for the back button
  };

  const handleNextPress = () => {
    console.log('Weiter button pressed');
    // Add your logic for the next button
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
      buttonStyle={{ alignSelf: 'flex-end' }}
    >
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>WURMTEST</Text>
        <Text style={styles.subtitle}>
          Hinterlege hier erfolgte Wurmtest um diese {'\n'}mit in die Übersicht
          auf zu nehmen.
        </Text>

        <View style={styles.formContainer}>
          {/* Date Picker */}
          <Text style={styles.label}>Datum</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
            <Text style={{ color: date ? '#000' : '#999' }}>{date || ''}</Text>
            <Image
              source={require('@/assets/images/Frame.png')} // Replace with your calendar icon
              style={styles.icon}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {/* Medication Name */}
          <Text style={styles.label}>Wurmmittel</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={medication}
            onChangeText={setMedication}
          />

          {/* Test Name */}
          <Text style={styles.label}>Name des Tests</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={manufacturer}
            onChangeText={setManufacturer}
          />

          {/* Manufacturer */}
          <Text style={styles.label}>Hersteller</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={note}
            onChangeText={setNote}
          />

          {/* Tested For Section */}
          <Text style={styles.label}>Getestet auf</Text>
          <View style={styles.wormContainer}>
            {worms.map((worm) => (
              <TouchableOpacity
                key={worm}
                style={[
                  styles.wormTab,
                  selectedWorms.includes(worm) && styles.selectedWormTab,
                ]}
                onPress={() => toggleWormSelection(worm)}
              >
                <Text
                  style={[
                    styles.wormText,
                    selectedWorms.includes(worm) && styles.selectedWormText,
                  ]}
                >
                  {worm}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Findings */}
          <Text style={styles.label}>Welcher Befund</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={note}
            onChangeText={setNote}
          />

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
      </ScrollView>
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
  wormContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  wormTab: {
    borderWidth: 1,
    borderColor: "#899E33",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "white",
  },
  selectedWormTab: {
    backgroundColor: "#899E33",
  },
  wormText: {
    fontSize: 14,
    color: "black",
  },
  selectedWormText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  nextButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#000',
  },
  nextButtonText: {
    color: '#fff',
  }
});

export default WormTreatment;
