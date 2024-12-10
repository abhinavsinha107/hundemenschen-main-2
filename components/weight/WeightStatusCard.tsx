import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import ArrowIcon from '../icons/ArrowIcon';
import { useLatestWeights } from '@/stores/weightStore';

export default function WeightStatusCard() {
  const { latest, previous } = useLatestWeights();

  // If we don't have enough entries, show the no entries message
  if (!latest) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEntriesSubText}>
          noch kein Einträge vorhanden
        </Text>
      </View>
    );
  }

  const currentWeight = latest.weight;
  const beforeWeight = previous?.weight;
  const currentDate = new Date(latest.date);
  const beforeDate = previous ? new Date(previous.date) : null;

  const baseRotation = 1; // The SVG's base rotation offset

  /**
   * Calculates the arrow rotation based on the proportional weight difference.
   * The result will fall strictly between -90 and 90, with the base rotation offset.
   *
   * @returns {number} The arrow rotation in degrees.
   */
  const getArrowRotation = () => {
    if (!beforeWeight) return baseRotation;

    const maxRotation = 90; // Maximum rotation (excluding baseRotation)
    const weightDifference = currentWeight - beforeWeight;

    // Calculate proportional rotation
    const proportionalRotation =
      (weightDifference / beforeWeight) * maxRotation;

    // Clamp the value to the range [-90, 90]
    const clampedRotation = Math.max(
      -maxRotation,
      Math.min(maxRotation, proportionalRotation),
    );

    // Add base offset
    return clampedRotation + baseRotation;
  };

  // Helper function to determine weight status
  const getWeightStatus = () => {
    if (!beforeWeight) return 'Erster Gewichtseintrag';

    const weightDifference = currentWeight - beforeWeight;
    if (Math.abs(weightDifference) < 0.1)
      return 'Das Gewicht ist stabil geblieben';
    if (weightDifference > 0) return 'Das Gewicht hat zugenommen';
    return 'Das Gewicht hat abgenommen';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.goalHeaderText}>{getWeightStatus()}</Text>
      <View style={styles.entriesContainer}>
        {previous && (
          <View style={styles.entry}>
            <Text style={styles.beforeText}>VORHER</Text>
            <Text>{beforeWeight.toFixed(1).replace('.', ',')} kg</Text>
            <Text style={styles.dateText}>
              {beforeDate?.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
          </View>
        )}

        <View style={styles.arrowContainer}>
          {previous && (
            <View
              style={{
                transform: [{ rotate: `${getArrowRotation()}deg` }],
              }}
            >
              <ArrowIcon />
            </View>
          )}
        </View>

        <View style={[styles.entry, !previous && styles.singleEntry]}>
          <Text>
            <Text style={styles.currentWeightText}>
              {currentWeight.toFixed(1).replace('.', ',')}
            </Text>
            <Text style={styles.weightUnitText}>kg</Text>
          </Text>
          <Text style={styles.dateText}>
            {currentDate.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.vitalGreen,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 1,
    shadowRadius: 24,
    padding: 20,
    width: '100%',
  },
  entriesContainer: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  entry: {
    flex: 1,
    gap: 0,
  },
  arrowContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalHeaderText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 18,
  },
  noEntriesSubText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  beforeText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  currentWeightText: {
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 75,
    textTransform: 'uppercase',
  },
  weightUnitText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 30,
  },
  singleEntry: {
    flex: 1,
    alignItems: 'center',
  },
});
