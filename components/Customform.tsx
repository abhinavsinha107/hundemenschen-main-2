import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import Text from './Text';
import { Colors } from '@/constants/Colors';

const CustomForm = () => {
  const [selectedDropdown1, setSelectedDropdown1] = useState('');
  const [selectedDropdown2, setSelectedDropdown2] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vollständiger Name</Text>
      <TextInput style={styles.input} placeholder="Vollständiger Name" />

      <Text style={styles.label}>
        Platzhalter <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[styles.input, styles.errorInput]}
        placeholder="Platzhalter"
      />

      <Text style={styles.label}>
        test Eingabe{' '}
        <FontAwesome
          name="question-circle"
          size={14}
          color={Colors.light.darkGray}
        />
      </Text>
      <TextInput style={styles.input} placeholder="test Eingabe" />

      <Text style={styles.label}>Vollständiger Name</Text>
      <TextInput style={styles.inputBold} placeholder="Platzhalterg" />

      <Text style={styles.label}>
        test Eingabe{' '}
        <FontAwesome
          name="question-circle"
          size={14}
          color={Colors.light.darkGray}
        />
      </Text>
      <TextInput style={styles.inputBold} placeholder="Platzhalterg" />

      <Text style={styles.label}>Dropdown</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDropdown1}
          onValueChange={(itemValue) => setSelectedDropdown1(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Einheit wählen" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
      </View>

      <Text style={styles.label}>Dropdown 2</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDropdown2}
          onValueChange={(itemValue) => setSelectedDropdown2(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Einheit wählen" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
      </View>

      <View style={styles.row}>
        <View style={styles.dateField}>
          <Text style={styles.label}>Beginn ... *</Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {startDate.toLocaleDateString()}
            </Text>
            <FontAwesome
              name="calendar"
              size={16}
              color={Colors.light.darkGray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dateField}>
          <Text style={styles.label}>Ende ...</Text>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
            <FontAwesome
              name="calendar"
              size={16}
              color={Colors.light.darkGray}
            />
          </TouchableOpacity>
        </View>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onEndDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.light.white,
    width: '100%',
    maxWidth: 400, // Max width for larger screens
    alignSelf: 'center', // Center the container
  },
  label: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 5,
    marginTop: 10,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: Colors.light.mediumGreen,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  inputBold: {
    height: 40,
    borderColor: Colors.light.mediumGreen,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    width: '100%',
  },
  errorInput: {
    borderColor: Colors.light.attentionRed,
  },
  pickerContainer: {
    borderColor: Colors.light.mediumGreen,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
    width: '100%',
  },
  picker: {
    height: 40,
    color: Colors.light.darkGray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateField: {
    flex: 1,
    marginRight: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
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

export default CustomForm;
