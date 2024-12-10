import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const InfoBox = () => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="info-circle"
        size={18}
        color={Colors.light.mediumGreen}
        style={styles.icon}
      />
      <Text style={styles.text}>
        Hier soll ein bis zu 5 Zeilen langer Text stehen, der wichtige
        Informationen zu dem gewählten Thema gibt und anzeigt was zu beachten
        ist.
      </Text>
      <TouchableOpacity>
        <FontAwesome
          name="times"
          size={18}
          color={Colors.light.darkGray}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.light.lightGray, // Background color for the box
    borderWidth: 1,
    borderColor: Colors.light.mediumGray,
    padding: 10,
    width: 300,
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  closeIcon: {
    marginLeft: 10,
    marginTop: 2,
  },
});

export default InfoBox;
