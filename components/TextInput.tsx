import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  TextInputProps,
} from 'react-native';
import Text from './Text';

interface Props extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

const TextInput: React.FC<Props> = ({
  label,
  error,
  required,
  style,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <RNTextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  input: {
    borderWidth: 1,
    borderColor: '#899E33',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    backgroundColor: 'white',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 16,
  },
});

export default TextInput;
