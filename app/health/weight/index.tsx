import Text from '@/components/Text';
import WeightStatusCard from '@/components/weight/WeightStatusCard';
import WeightList from '@/components/weight/WeightList';
import useDogStore from '@/stores/dogStore';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const dog = useDogStore((state) => state.dog);

  if (!dog) {
    return (
      <View style={styles.container}>
        <Text>No dog selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text style={styles.mainText}>Hundegewicht</Text>
            <Text style={styles.subText}>überwachen</Text>
          </View>
        </View>
        <WeightStatusCard />
        <WeightList />
      </ScrollView>
      <Pressable
        style={styles.fab}
        onPress={() => router.push('/health/weight/create')}
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
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    flexDirection: 'column',
  },
  mainText: {
    color: '#AFC944',
    fontFamily: 'Arkipelago',
    fontSize: 50,
    fontWeight: '400',
  },
  subText: {
    color: '#3B3B3B',
    fontSize: 30,
    fontWeight: '400',
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
