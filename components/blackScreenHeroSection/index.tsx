import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface BlackScreenHeroSectionProps {
  heading: string;
  subHeading: string;
}

const BlackScreenHeroSection = ({
  heading,
  subHeading,
}: BlackScreenHeroSectionProps) => {
  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};

export default BlackScreenHeroSection;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Arkipelago',
    fontWeight: '400',
    fontSize: 45,
    color: '#AFC944',
  },
  subHeading: {
    fontFamily: 'Brother1816Printed',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 36,
    color: '#FFFFFF',
  },
});
