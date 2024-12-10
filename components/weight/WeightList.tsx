import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import { useLatestWeights } from '@/stores/weightStore';

export default function WeightList() {
  const { all: weights } = useLatestWeights();

  if (weights.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gewichtsverlauf</Text>
      {weights.map((weight) => (
        <View key={weight.id} style={styles.entry}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {new Date(weight.date).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={styles.weightContainer}>
            <Text style={styles.weight}>
              {weight.weight.toFixed(1).replace('.', ',')}
              <Text style={styles.unit}> kg</Text>
            </Text>
            {weight.notes && <Text style={styles.notes}>{weight.notes}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B3B3B',
    marginBottom: 8,
  },
  entry: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  dateContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  weightContainer: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  weight: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B3B3B',
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
