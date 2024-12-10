import React from 'react';
import Text from '@/components/Text';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  isCircle?: boolean;
  isSmalll?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  isCircle = false,
  isSmalll,
}) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        variant === 'primary'
          ? styles.primaryButton
          : variant === 'secondary'
            ? styles.secondaryButton
            : styles.tertiaryButton,
        disabled && styles.disabledButton,
        isCircle && styles.isCircle,
        isSmalll && { height: 50, width: 50 },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary'
            ? styles.primaryButtonText
            : variant === 'secondary'
              ? styles.secondaryButtonText
              : styles.tertiaryButtonText,
          disabled && styles.disabledButtonText,
          isCircle && styles.isCircleText,
          isSmalll && {
            fontSize: 40,
            lineHeight: 40,
            transform: [{ translateY: +10 }],
          },
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
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: Colors.light.lightGreen,
  },
  secondaryButton: {
    backgroundColor: Colors.light.white,
  },
  tertiaryButton: {
    backgroundColor: Colors.light.darkGray,
  },
  disabledButton: {
    backgroundColor: Colors.light.lightGray,
  },
  isCircle: {
    borderRadius: 70,
    width: 70,
    height: 70,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonText: {
    color: Colors.light.darkGray,
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
  tertiaryButtonText: {
    color: Colors.light.white,
  },
  disabledButtonText: {
    color: Colors.light.mediumGray,
  },
  isCircleText: {
    fontWeight: '300',
    fontSize: 55,
    lineHeight: 55,
    textAlign: 'center',
    transform: [{ translateY: +12 }],
    color: Colors.light.white,
  },
});

export default Button;
