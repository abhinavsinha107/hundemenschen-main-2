import Text from '@/components/Text';
import useDogStore from '@/stores/dogStore';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import FormWrapper from '@/app/forms/formWrapper';
import Button from '@/components/Button';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import DatePickerInput from '@/components/DatePickerInput';
import useHeatStore from '@/stores/heatStore';
import { HorizontalLine } from '@/components/HorizontalLine';

export default function HeatForm() {
  const router = useRouter();
  const dog = useDogStore((state) => state.dog);
  const createNewHeat = useHeatStore((state) => state.createNewHeat);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [problems, setProblems] = useState('');
  const [notes, setNotes] = useState('');

  const onSubmit = async () => {
    if (!dog) return;

    try {
      await createNewHeat({
        dog_id: dog.id,
        start_date: new Date(startDate),
        end_date: endDate != '' ? new Date(endDate) : new Date(),
        problems: problems || '',
        notes: notes || '',
      });

      //reset(); // Reset form after successful submission
      console.log('Heat saved successfully');

      // Navigate back to the heat index screen
      router.navigate('/health/heat');
    } catch (error) {
      console.error('Error saving heat:', error);
    }
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
        <Text style={styles.headerTitle}>Läufigkeit</Text>
        <Text style={styles.headerDescription}>
          Dokumentiere die Läufigkeit deiner Hündin, um Unregelmäßigkeiten zu
          erkennen und auf ihre Bedürfnisse eingehen zu können.
        </Text>

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
        <HorizontalLine />
        <Text>Probleme während der Läufigkeit</Text>
        <TextInput
          style={styles.input}
          value={problems}
          onChangeText={setProblems}
        />

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
