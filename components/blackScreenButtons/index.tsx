import { router, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BlackScreenButtonsProps {
  disableBack?: boolean;
  onContinueClick?: any;
}

const BlackScreenButtons = ({
  disableBack,
  onContinueClick,
}: BlackScreenButtonsProps) => {
  return (
    <View style={styles.bottomTab}>
      {
        <TouchableOpacity
          style={{ ...styles.backButton, opacity: disableBack ? 0 : 1 }}
          disabled={disableBack}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.continueButton} onPress={onContinueClick}>
        <Text style={styles.continueButtonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlackScreenButtons;

const styles = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#898989',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  backButton: {
    backgroundColor: 'inherit',
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
    height: '40%',
    marginTop: 15,
    width: 165,
  },
  backButtonText: {
    fontFamily: 'Brother1816Printed',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 17,
  },
  continueButton: {
    backgroundColor: '#C2DE4C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
    height: '40%',
    marginTop: 15,
    width: 165,
    borderWidth: 1.5,
    borderColor: '#C2DE4C',
  },
  continueButtonText: {
    fontFamily: 'Brother1816Printed',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 17,
  },
});
