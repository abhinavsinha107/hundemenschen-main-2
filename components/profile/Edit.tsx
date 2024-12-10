import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Text from '../Text';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

type Props = {
  title: string | null;
  path: string;
};
export const Edit: React.FC<Props> = ({ title, path }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => router.push(path)}>
        <Text style={styles.content}>bearbeiten</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: Colors.light.mediumGreen,
  },
  content: {
    fontSize: 14,
  },
});
