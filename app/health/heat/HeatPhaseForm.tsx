import Text from '@/components/Text';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import DatePickerInput from '@/components/DatePickerInput';
import FormWrapper from '@/app/forms/formWrapper';
import Button from '@/components/Button';
import { useState } from 'react';
import { HorizontalLine } from '@/components/HorizontalLine';
import Dropdown from '@/components/heatlth/Dropdown';
import CustomCheckbox from '@/components/CheckBox';
import useHeatPhaseStore from '@/stores/heatPhaseStore';
import { useLatestHeat } from '@/stores/heatStore';

const phases = [
  { id: 1, value: 'Vorbrunst' },
  { id: 2, value: 'Standhitze/Brunst' },
  { id: 3, value: 'Nachbrunst' },
  { id: 4, value: 'Ruhephase' },
];

export default function HeatPhaseForm() {
  const router = useRouter();
  const createNewHeatPhase = useHeatPhaseStore(
    (state) => state.createNewHeatPhase,
  );
  const { all: heat } = useLatestHeat();
  const heatStartDates = heat.map((element, index) => ({
    id: element.id,
    value: element.start_date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [problems, setProblems] = useState('');
  const [notes, setNotes] = useState('');
  const [heatId, setHeatId] = useState(0);
  const [phase, setPhase] = useState('0');
  const [hypocritical, setHypocritical] = useState(false);
  const [pregnant, setPregnant] = useState(false);

  const onSubmit = async () => {
    if (!heat) return;

    try {
      await createNewHeatPhase({
        heat_id: heatId,
        phase: phase,
        start_date: new Date(startDate),
        end_date: endDate != '' ? new Date(endDate) : new Date(),
        problems: problems || '',
        hypocritical: hypocritical,
        pregnant: pregnant,
        notes: notes || '',
      });

      //reset(); // Reset form after successful submission
      console.log('Heat phase saved successfully');

      // Navigate back to the heat index screen
      router.navigate('/health/heat');
    } catch (error) {
      console.error('Error saving heat phase:', error);
    }
  };

  const handleSelectPhase = (phase_id) => {
    let phaseObject = phases.find((p) => p.id === phase_id);
    let tempPhase = phaseObject ? phaseObject.value : '';
    setPhase(tempPhase);
  };

  return (
    <View style={styles.container}>
      <FormWrapper
        footer={
          <View style={styles.footer}>
            <Button
              title="SPEICHERN"
              variant="tertiary"
              onPress={() => onSubmit()}
            />
          </View>
        }
      >
        <Text style={styles.headerTitle}>Phase der Läufigkeit</Text>
        <Text style={styles.headerDescription}>
          Dokumentiere einzelne Phasen der Läufigkeit, um Verändeungen und
          Probleme genauer wahrzunehmen und handeln zu können.
        </Text>
        <Dropdown
          title="Dazugehöriger Zyklus"
          onChange={setHeatId}
          items={heatStartDates}
          required
        ></Dropdown>
        <Dropdown
          title="Phase"
          onChange={handleSelectPhase}
          items={phases}
          required
        ></Dropdown>

        <HorizontalLine />

        <View style={styles.formContainer}>
          <DatePickerInput
            value={startDate}
            onChange={setStartDate}
            label="Beginn des Zyklus"
            required
          />
          <DatePickerInput
            value={endDate}
            onChange={setEndDate}
            label="Ende des Zyklus"
          />
        </View>

        <Text>Probleme während der Läufigkeit</Text>
        <TextInput
          style={styles.input}
          value={problems}
          onChangeText={setProblems}
        />
        <View style={styles.formContainer}>
          <CustomCheckbox
            onChange={setHypocritical}
            label="Scheinträchtigkeit"
          />
          <CustomCheckbox onChange={setPregnant} label="Trächtigkeit" />
        </View>
        <Text>Eigene Anmerkungen</Text>
        <TextInput style={styles.input} value={notes} onChangeText={setNotes} />
      </FormWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.48,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  headerDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.42,
    marginBottom: 30,
  },
  formContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  form: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  footer: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
