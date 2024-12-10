import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function HealthDashboardCard({ title, icon, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View>{icon}</View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    width: 170,
    height: 140,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: Colors.light.white,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  text: {
    color: Colors.light.black,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
