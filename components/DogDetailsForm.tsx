import React, { useState } from 'react';
import Text from '@/components/Text';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const DogDetailsForm = () => {
  const [isSterilized, setIsSterilized] = useState(false);
  const [isPurebred, setIsPurebred] = useState(false);
  const [insurance, setInsurance] = useState(null);
  const [bloodGroupKnown, setBloodGroupKnown] = useState(null);
  const [isEstimated, setIsEstimated] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Auto-Layout Vorlagen</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Stelle des Chips</Text>
        <TextInput style={styles.input} placeholder="" />

        <Text style={styles.labelWithIcon}>
          Anmerkungen zu Kennzeichnungen des Hundes{' '}
          <Text style={styles.helpIcon}>?</Text>
        </Text>
        <TextInput style={styles.input} placeholder="" />

        {/* Multiple Chip Date Input */}
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="" />
          <TextInput style={styles.inputSmall} placeholder="" />
        </View>

        <Text style={styles.labelWithIcon}>
          Chipnummer 15-stellig <Text style={styles.helpIcon}>?</Text>
        </Text>

        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="" />
          <TextInput style={styles.inputSmall} placeholder="" />
        </View>

        {/* Additional Fields */}
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="" />
          <TextInput style={styles.inputSmall} placeholder="" />
        </View>

        <Text style={styles.label}>Geburtsdatum</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="" />
          <TouchableOpacity
            style={[styles.checkbox, isEstimated && styles.checkboxSelected]}
            onPress={() => setIsEstimated(!isEstimated)}
          >
            <Text style={styles.checkboxLabel}>geschätzt</Text>
          </TouchableOpacity>
        </View>

        {/* Checkbox for kastriert/sterilisiert */}
        <Text style={styles.label}>kastriert/sterilisiert</Text>
        <TouchableOpacity
          style={[styles.checkbox, isSterilized && styles.checkboxSelected]}
          onPress={() => setIsSterilized(!isSterilized)}
        >
          <Text style={styles.checkboxLabel}>kastriert/sterilisiert</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Zuchthund</Text>
        <TouchableOpacity
          style={[styles.checkbox, isPurebred && styles.checkboxSelected]}
          onPress={() => setIsPurebred(!isPurebred)}
        >
          <Text style={styles.checkboxLabel}>Zuchthund</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Besteht eine Tierkrankenversicherung? Welche?
        </Text>
        <View style={styles.insuranceContainer}>
          <TouchableOpacity
            style={[
              styles.roundedButton,
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
              styles.roundedButton,
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
          <TextInput placeholder="" style={styles.fixedInput} />
        </View>

        {/* Insurance Question */}
        <Text style={styles.sectionTitle}>
          Besteht eine Tierkrankenversicherung? Welche?
        </Text>
        <View style={styles.insuranceContainer}>
          <TouchableOpacity
            style={[
              styles.roundedButton,
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
              styles.roundedButton,
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
          <TextInput placeholder="" style={styles.fixedInput} />
        </View>

        {/* Blood Group Known */}
        <Text style={styles.sectionTitle}>Blutgruppe bekannt? Welche?</Text>
        <View style={styles.insuranceContainer}>
          <TouchableOpacity
            style={[
              styles.roundedButton,
              bloodGroupKnown === 'ja' && styles.selectedButton,
            ]}
            onPress={() => setBloodGroupKnown('ja')}
          >
            <Text
              style={[
                styles.optionText,
                bloodGroupKnown === 'ja' && styles.selectedText,
              ]}
            >
              ja
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roundedButton,
              bloodGroupKnown === 'nein' && styles.selectedButton,
            ]}
            onPress={() => setBloodGroupKnown('nein')}
          >
            <Text
              style={[
                styles.optionText,
                bloodGroupKnown === 'nein' && styles.selectedText,
              ]}
            >
              nein
            </Text>
          </TouchableOpacity>
          <TextInput placeholder="" style={styles.fixedInput} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    color: Colors.light.black,
    paddingTop: 5,
    width: 291,
    height: 25,
  },
  titleContainer: {
    paddingTop: 34,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  labelWithIcon: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.mediumGreen,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  fixedInput: {
    width: 150,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    marginBottom: 10,
  },
  checkboxSelected: {
    backgroundColor: Colors.light.mediumGreen,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  roundedButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20, // Rounder buttons
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: Colors.light.mediumGreen,
  },
  optionText: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  selectedText: {
    color: Colors.light.white,
  },
});

export default DogDetailsForm;
