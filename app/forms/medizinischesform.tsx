import { Colors } from '@/constants/Colors';
import useMedicalInfoStore from '@/stores/medicalInfoStore';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Text from '@/components/Text';
import { CheckBox } from 'react-native-elements';
import FormWrapper from './formWrapper';
import Button from '@/components/Button';

const MedicalInfoScreen = () => {
  const [foodAllergy, setFoodAllergy] = useState('');
  const [medicationAllergy, setMedicationAllergy] = useState('');
  const [contraindications, setContraindications] = useState('');
  const [bloodType, setBloodType] = useState('unbekannt');
  const [transfusion, setTransfusion] = useState('unbekannt');
  const [chronicIllness, setChronicIllness] = useState('unbekannt');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [visitedCountries, setVisitedCountries] = useState('');
  const [mediterraneanDisease, setMediterraneanDisease] =
    useState('nicht getestet');
  const [findings, setFindings] = useState('');
  const [mediterraneanDiseaseFindings, setMediterraneanDiseaseFindings] =
    useState('');
  const [aggressionWarning, setAggressionWarning] = useState(false);
  const [treatmentNotes, setTreatmentNotes] = useState('');
  const { medicalInfo, createNewMedicalInfo, setMedicalInfo } =
    useMedicalInfoStore();

  useEffect(() => {
    medicalInfo?.food_intolerances &&
      setFoodAllergy(medicalInfo.food_intolerances);
    medicalInfo?.medication_intolerances &&
      setMedicationAllergy(medicalInfo.medication_intolerances);
    medicalInfo?.contraindications &&
      setContraindications(medicalInfo.contraindications);
    medicalInfo?.blood_type && setBloodType(medicalInfo.blood_type);
    medicalInfo?.blood_transfusion_received !== undefined &&
      setTransfusion(medicalInfo.blood_transfusion_received ? 'ja' : 'nein');
    medicalInfo?.chronic_illness !== undefined &&
      setChronicIllness(medicalInfo.chronic_illness ? 'ja' : 'nein');
    medicalInfo?.medical_history &&
      setMedicalHistory(medicalInfo.medical_history);
    medicalInfo?.countries_visited &&
      setVisitedCountries(medicalInfo.countries_visited);
    medicalInfo?.mediterranean_disease !== undefined &&
      setMediterraneanDisease(
        medicalInfo.mediterranean_disease ? 'ja' : 'nein',
      );
    medicalInfo?.mediterranean_disease_findings &&
      setMediterraneanDiseaseFindings(
        medicalInfo.mediterranean_disease_findings,
      );
    medicalInfo?.caution_with_aggression !== undefined &&
      setAggressionWarning(!!medicalInfo.caution_with_aggression);
    medicalInfo?.notes && setTreatmentNotes(medicalInfo.notes);
  }, [medicalInfo]);

  const newMedicalInfoObject = {
    food_intolerances: foodAllergy,
    medication_intolerances: medicationAllergy,
    contraindications: contraindications,
    blood_type: bloodType,
    blood_transfusion_received: transfusion === 'ja' ? true : false,
    problematic_body_parts: findings,
    chronic_illness: chronicIllness === 'ja' ? true : false,
    medical_history: medicalHistory,
    countries_visited: visitedCountries,
    mediterranean_disease: mediterraneanDisease === 'ja' ? true : false,
    mediterranean_disease_findings:
      mediterraneanDisease === 'ja' ? mediterraneanDiseaseFindings : null,
    caution_with_aggression: aggressionWarning,
    notes: treatmentNotes,
  };

  const goToNextScreen = () => {
    // eslint-disable-next-line no-unused-expressions
    !medicalInfo
      ? createNewMedicalInfo(newMedicalInfoObject)
      : setMedicalInfo({ ...medicalInfo, ...newMedicalInfoObject });
    router.navigate('./allgemeinform');
  };

  return (
    <>
      <View style={styles.infoBox}>
        <Image
          source={require('@/assets/images/info.png')}
          style={{
            width: 15,
            height: 15,
            marginTop: 2.5,
          }}
        />
        <Text style={styles.infoText}>
          Bitte lege Diagnosen, Auffälligkeiten und die zugehörige Medikation
          später in der Gesundheitsakte an, um die Werte dort immer aktuell
          halten zu können.
        </Text>
      </View>
      <View style={styles.line} />
      <FormWrapper
        contentContainerStyle={styles.container}
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
              onPress={goToNextScreen}
            />
          </View>
        }
      >
        <Text style={styles.sectionTitle}>Medizinisches</Text>
        <Text style={styles.subtitle}>
          Hier kannst du wichtige medizinische Informationen zu deinem Hund
          hinterlegen.
        </Text>

        <Text style={styles.label}>
          Bekannte Unverträglichkeiten (Futtermittel)
        </Text>
        <TextInput
          style={styles.input}
          value={foodAllergy}
          onChangeText={setFoodAllergy}
        />

        <Text style={styles.label}>
          Bekannte Unverträglichkeiten (Medikamente)
        </Text>
        <TextInput
          style={styles.input}
          value={medicationAllergy}
          onChangeText={setMedicationAllergy}
        />

        <Text style={styles.label}>Gegenanzeigen (Kontraindikation)</Text>
        <TextInput
          style={styles.input}
          value={contraindications}
          onChangeText={setContraindications}
        />

        <Text style={styles.label}>Blutgruppe deines Hundes</Text>
        <View style={styles.buttonGroup}>
          {['unbekannt', 'DEA1.1 positiv', 'DEA1.1 negativ', 'andere'].map(
            (type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  bloodType === type && styles.selectedButton,
                ]}
                onPress={() => setBloodType(type)}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={styles.label}>Bereits eine Bluttransfusion erhalten?</Text>
        <View style={styles.buttonGroup}>
          {['ja', 'nein', 'unbekannt'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                transfusion === option && styles.selectedButton,
              ]}
              onPress={() => setTransfusion(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Liegt eine chronische Krankheit vor?</Text>
        <View style={styles.buttonGroup}>
          {['ja', 'nein', 'unbekannt'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                chronicIllness === option && styles.selectedButton,
              ]}
              onPress={() => setChronicIllness(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Vorgeschichte/Verletzungen/Unfälle/Brüche
        </Text>
        <TextInput
          style={styles.input}
          value={medicalHistory}
          onChangeText={setMedicalHistory}
        />

        <Text style={styles.label}>Bereits bereiste Länder</Text>
        <TextInput
          style={styles.input}
          value={visitedCountries}
          onChangeText={setVisitedCountries}
        />

        <Text style={styles.label}>Liegt eine Mittelmeererkrankung vor?</Text>
        <View style={styles.buttonGroup}>
          {['ja', 'nein', 'nicht getestet'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                mediterraneanDisease === option && styles.selectedButton,
              ]}
              onPress={() => setMediterraneanDisease(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Wenn ja, welche Befunde gab es?</Text>
        <TextInput
          style={styles.input}
          value={mediterraneanDiseaseFindings}
          onChangeText={setMediterraneanDiseaseFindings}
        />

        <Text style={styles.label}>Allgemeine medizinische Befunde</Text>
        <TextInput
          style={styles.input}
          value={findings}
          onChangeText={setFindings}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={aggressionWarning}
            onPress={() => setAggressionWarning(!aggressionWarning)}
            uncheckedColor={Colors.light.darkGreen}
            checkedColor={Colors.light.darkGreen}
          />
          <Text style={styles.checkboxLabel}>
            Es ist Vorsicht bei der Behandlung geboten.{'\n'}Der Hundreagiert
            u.U. aggresiv.
          </Text>
        </View>

        <Text style={styles.label}>Anmerkungen für Behandelnde</Text>
        <TextInput
          style={styles.input}
          value={treatmentNotes}
          onChangeText={setTreatmentNotes}
        />
      </FormWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 20,
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.darkGray,
    width: '70%',
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.light.darkGray,
    shadowColor: Colors.light.darkGray,
    shadowOffset: { width: 0, height: 2 }, //
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
  },
  selectedButton: {
    backgroundColor: Colors.light.vitalGreen,
    borderColor: Colors.light.vitalGreen,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  checkboxLabel: {
    fontSize: 12,
    marginLeft: -5,
    lineHeight: 24,
    padding: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: -20,
  },
});

export default MedicalInfoScreen;
