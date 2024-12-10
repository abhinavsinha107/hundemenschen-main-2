import Button from '@/components/Button';
import HealthDashboardCard from '@/components/heatlth/HealthDashboardCard';
import HeatIcon from '@/components/icons/HeatIcon';
import ParasiteProtectionIcon from '@/components/icons/ParasiteProtectionIcon';
import TreatmentIcon from '@/components/icons/TreatmentsIcon';
import WeightIcon from '@/components/icons/WeightIcon';
import useDogStore from '@/stores/dogStore';
import { router } from 'expo-router';
import Text from '@/components/Text';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function Health() {
  const dog = useDogStore((state) => state.dog);
  if (!dog) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GESUNDHEIT IM BLICK</Text>
        <Text style={styles.headerSubText}>
          Dokumentiere die Gesundheit von {dog.call_name} und führe regelmäßige
          Beobachtungs-Check ups durch.
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Gesundheitseinträge</Text>
        <View style={styles.cards}>
          <View style={styles.cardsRow}>
            <HealthDashboardCard
              title="Behandlungen"
              icon={<TreatmentIcon />}
              onPress={() => console.log('Behandlungen')}
            />
            <HealthDashboardCard
              title="Parasitenschutz"
              icon={<ParasiteProtectionIcon />}
              onPress={() =>
                router.push('/parasiteprotection/allEntriesScreen')
              }
            />
          </View>
          <View style={styles.cardsRow}>
            <HealthDashboardCard
              title="Gewicht prüfen"
              icon={<WeightIcon />}
              onPress={() => router.push('/health/weight')}
            />
            <HealthDashboardCard
              title="Läufigkeit"
              icon={<HeatIcon />}
              onPress={() => router.push('/health/heat')}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Zum Checkup"
          onPress={() => router.push('/health/checkup')}
        />
        <Button
          title="Zum Hundeprofil"
          onPress={() => router.push('/profile')}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  headerText: {
    color: Colors.light.lightGreen,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  headerSubText: {
    color: Colors.light.darkGray,
    fontSize: 12,
    fontWeight: '400',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  contentText: {
    color: Colors.light.darkGray,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  cardsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
