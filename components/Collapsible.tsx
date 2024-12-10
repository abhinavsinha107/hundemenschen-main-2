import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import Text from '@/components/Text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Text style={styles.heading_text}>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 15,
    width: '90%',
    borderWidth: 1,
    borderColor: Colors.light.black,
    borderRadius: 14,
  },
  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    gap: 6,
  },
  heading_text: {
    textTransform: 'uppercase',
  },
  content: {
    margin: 15,
  },
});
