import React from 'react';
import Text from '@/components/Text';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

type RoundedButtonProps = {
  text: string;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  onPress,
  selected = false,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, selected && styles.selectedButton, style]}
    >
      <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.light.white,
    borderColor: Colors.light.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: Colors.light.darkGray,
  },
  buttonText: {
    color: Colors.light.darkGray,
    fontSize: 16,
  },
  selectedButtonText: {
    color: Colors.light.white,
  },
});

export default RoundedButton;
