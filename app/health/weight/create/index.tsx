import Button from '@/components/Button';
import DatePickerInput from '@/components/DatePickerInput';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import useDogStore from '@/stores/dogStore';
import useWeightStore from '@/stores/weightStore';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';

const weightFormSchema = z.object({
  date: z.string().min(1, { message: 'Datum ist erforderlich' }),
  weight: z
    .string()
    .min(1, { message: 'Gewicht ist erforderlich' })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Bitte geben Sie ein gültiges Gewicht ein',
    }),
  notes: z.string().optional(),
});

type WeightFormData = z.infer<typeof weightFormSchema>;

export default function Index() {
  const dog = useDogStore((state) => state.dog);
  const createNewWeight = useWeightStore((state) => state.createNewWeight);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WeightFormData>({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      date: '',
      weight: '',
      notes: '',
    },
  });

  const onSubmit = async (data: WeightFormData) => {
    if (!dog) return;

    try {
      await createNewWeight({
        dog_id: dog.id,
        date: new Date(data.date),
        weight: parseFloat(data.weight),
        notes: data.notes || '',
      });

      reset(); // Reset form after successful submission
      console.log('Weight saved successfully');

      // Navigate back to the weight screen
      router.back();
    } catch (error) {
      console.error('Error saving weight:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>Gewicht</Text>
          <Text style={styles.headerDescription}>
            Trage hier das aktuelle Gewicht ein und mache dir bewusst ob dein
            Hund zu oder ab genommen hat und ob dies beabsichtigt war.
          </Text>
        </View>
        <View style={styles.form}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                label="Datum"
                error={errors.date?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Gewicht"
                value={value}
                onChangeText={onChange}
                error={errors.weight?.message}
                required
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Eigene Anmerkung"
                value={value}
                onChangeText={onChange}
                multiline
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
          variant="tertiary"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '100%',
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: 'column',
    gap: 30,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.48,
    textTransform: 'uppercase',
  },
  headerDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.42,
  },
  form: {
    flexDirection: 'column',
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
