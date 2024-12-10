import Text from '@/components/Text';
import useDogStore from '@/stores/dogStore';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { useLatestHeat } from '@/stores/heatStore';
import { useLatestHeatPhase } from '@/stores/heatPhaseStore';

export default function Index() {
  const router = useRouter();
  const dog = useDogStore((state) => state.dog);
  const { all: heat } = useLatestHeat();
  const { all: heatPhases } = useLatestHeatPhase();

  if (!dog) {
    return (
      <View style={styles.container}>
        <Text>No dog selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Läufigkeit" subTitle="notieren" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {heat.map((heatData) => (
          <View key={heatData.id}>
            <View style={styles.phaseContainer}>
              <View>
                <Text>
                  {new Date(heatData.start_date).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
                <Text>
                  {heatData.end_date ? (
                    new Date(heatData.end_date).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  ) : (
                    <Text>Noch kein Enddatum</Text>
                  )}
                </Text>
              </View>
              <Text>Läufigkeit</Text>
            </View>
            <View>
              <Text>Probleme:</Text>
              {heatData.problems && <Text>{heatData.problems}</Text>}
              <Text>Eigene Anmerkungen</Text>
              {heatData.notes && <Text>{heatData.notes}</Text>}
            </View>
            <View>
              {heatPhases
                .filter((heatPhase) => heatPhase.heat_id === heatData.id)
                .map((heatPhase) => (
                  <View key={heatPhase.id} style={styles.phaseContainer}>
                    <View>
                      <Text>
                        {new Date(heatPhase.start_date).toLocaleDateString(
                          'de-DE',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          },
                        )}
                      </Text>
                      <Text>
                        {heatPhase.end_date ? (
                          new Date(heatPhase.end_date).toLocaleDateString(
                            'de-DE',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            },
                          )
                        ) : (
                          <Text>Noch kein Enddatum</Text>
                        )}
                      </Text>
                    </View>
                    <Text>{heatPhase.phase}</Text>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={styles.fab}
        onPress={() => router.push('./AddEntrySelectionScreen')}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 40,
  },
  phaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3B3B3B',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderColor: '#FFF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
