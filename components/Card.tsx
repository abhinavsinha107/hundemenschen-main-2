import { Colors } from '@/constants/Colors';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export function Card({ children }: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 10,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 14,
    backgroundColor: Colors.light.white,
  },
});
