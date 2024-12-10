import { View, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';

export function Header({ title, subTitle, text = '' }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    padding: 20,
  },
  title: {
    color: Colors.light.lightGreen,
    fontFamily: 'Arkipelago',
    fontSize: 50,
    fontWeight: '400',
  },
  subTitle: {
    color: Colors.light.darkGray,
    fontSize: 30,
    fontWeight: '400',
  },
  text: {
    color: Colors.light.darkGray,
    fontSize: 12,
    fontWeight: 400,
  },
});
