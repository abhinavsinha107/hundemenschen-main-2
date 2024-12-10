import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = {
  value: number;
  max: number;
};

const ProgressBar: React.FC<Props> = ({ value, max }) => {
  const progress = (value / max) * 100;
  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.progress, { width: `${progress}%` }]} />
      <View style={styles.progressText}>
        <Text>{`${value} / ${max}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.light.lightGreen,
  },
  progressText: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    right: 8,
    color: Colors.light.darkGray,
    fontSize: 12,
    fontWeight: '400',
  },
});

export default ProgressBar;
