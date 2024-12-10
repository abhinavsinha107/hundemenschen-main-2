import { View, StyleSheet } from 'react-native';
import Text from '../Text';

type Props = {
  content: string[] | null;
};

export const Adress: React.FC<Props> = ({ content }) => {
  if (content) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Adresse</Text>
        <Text style={styles.content}>
          {content[0]} {content[1]}
        </Text>
        <Text style={styles.content}>
          {content[2]} {content[3]}
        </Text>
        <Text style={styles.content}>{content[4]}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
  },
});
