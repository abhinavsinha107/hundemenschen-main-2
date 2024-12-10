import React from 'react';
import Text from '@/components/Text';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

const WeiterButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary'
            ? styles.primaryButtonText
            : styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderRadius: 8,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: Colors.light.black,
  },
  secondaryButton: {
    backgroundColor: Colors.light.white,
  },
  disabledButton: {
    backgroundColor: Colors.light.lightGray,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  primaryButtonText: {
    color: Colors.light.darkGray,
  },
  secondaryButtonText: {
    color: Colors.light.black,
  },
  disabledButtonText: {
    color: Colors.light.mediumGray,
  },
});

export default WeiterButton;
