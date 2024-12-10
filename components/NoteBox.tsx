import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';

interface NoteBoxProps {
  note: string;
}

export default function NoteBox({ note }: NoteBoxProps) {
  return (
    <View style={styles.noteWrapper}>
      <View style={styles.container}>
        <Text>
          <Text style={styles.label}>Eigene Anmerkung: </Text>
          <Text style={styles.noteText}>{note}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.light.black,
    padding: 20,
    paddingVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: Colors.light.lightGray,
    maxWidth: '80%',
  },
  label: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.light.mediumGreen,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.mediumGray,
  },
});
