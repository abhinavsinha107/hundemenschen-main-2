import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from '@/components/Text';

interface DatePickerInputProps {
  value: string | null;
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  placeholder = 'Datum wählen',
  label,
  error,
  required,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    onChange(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    hideDatePicker();
  };

  return (
    <View>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.dateInput, error ? styles.dateInputError : null]}
        onPress={showDatePicker}
      >
        <Text style={{ color: value ? '#000' : '#999' }}>
          {value || placeholder}
        </Text>
        <Image
          source={require('@/assets/images/Frame.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  required: {
    color: '#FF0000',
    marginLeft: 4,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#899E33',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    backgroundColor: 'white',
  },
  dateInputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
});

export default DatePickerInput;
