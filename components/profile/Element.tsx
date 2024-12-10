import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import { Colors } from '@/constants/Colors';
import { CheckElement } from '../Unbekannt_Label';

type Props = {
  title: string | null;
  content: string[] | null;
  mode: string;
};

export const Element: React.FC<Props> = ({ title, content, mode }) => {
  const modes = new Map([
    ['header', { title: styles.header_title, content: styles.header_content }],
    ['entry', { title: styles.entry_title, content: styles.entry_content }],
    [
      'checkEntry',
      { title: styles.check_entry_title, content: styles.check_entry_content },
    ],
    ['notes', { title: styles.notes_title, content: styles.notes_content }],
  ]);

  return (
    <View style={styles.entry_container}>
      {title && <Text style={modes.get(mode)?.title}>{title}</Text>}
      {content &&
        content.map((contentElement) => {
          if (contentElement != '')
            return (
              <Text key={contentElement} style={modes.get(mode)?.content}>
                {mode != 'checkEntry' ? (
                  contentElement
                ) : (
                  <CheckElement
                    color={Colors.light.mediumGreen}
                    text={contentElement}
                  ></CheckElement>
                )}
              </Text>
            );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  entry_container: {
    marginVertical: 8,
  },
  entry_content: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entry_title: {
    fontSize: 14,
  },
  check_entry_content: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  check_entry_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notes_title: {
    fontSize: 14,
    color: Colors.light.mediumGreen,
  },
  notes_content: {
    fontSize: 14,
  },
  header_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header_content: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: Colors.light.darkGreen,
  },
});
