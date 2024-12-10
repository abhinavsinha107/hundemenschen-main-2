import React from 'react';

import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const ListItem = ({ title, subtitle, date, action, isHighlighted }) => {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        isHighlighted ? styles.highlightedItem : styles.defaultItem,
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.date}>{date}</Text>
        {action ? <Text style={styles.action}>{action}</Text> : null}
        <FontAwesome
          name="chevron-right"
          size={14}
          color={Colors.light.darkGray}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  highlightedItem: {
    backgroundColor: Colors.light.vitalGreen, // Yellow highlight for highlighted items
    borderWidth: 0, // Remove border for highlighted items
  },
  defaultItem: {
    backgroundColor: Colors.light.lightGray, // Default gray background for non-highlighted items
    borderColor: Colors.light.mediumGray,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.mediumGray,
  },
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  date: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginRight: 5,
  },
  action: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
    marginRight: 5,
  },
});

export default ListItem;
