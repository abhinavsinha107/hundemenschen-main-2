import { router } from 'expo-router';
import Text from '@/components/Text';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const splash = require('@/assets/images/splash.jpg');

export default function Index() {
  return (
    <View style={styles.startupView}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Hundegesundheit</Text>
        <Text style={styles.subtitleHeader}>immer im Blick</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('../healthRecordDialog/InstructionScreen')}
        // style={{ opacity: 0 }}
      >
        <Image style={styles.splashImage} source={splash} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  startupView: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.light.white,
    marginTop: '9%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.light.white,
  },
  titleHeader: {
    color: Colors.light.vitalGreen,
    fontSize: 30,
    lineHeight: 30,
  },
  subtitleHeader: {
    fontSize: 20,
  },
  splashImage: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: 16,
  },
});
