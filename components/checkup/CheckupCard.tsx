import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Checkup, CheckupAnswer } from '@/db/schema';
import ChevronIcon from '../icons/ChevronIcon';
import { Colors } from '@/constants/Colors';
import { differenceInDays } from 'date-fns';
import { questions } from '@/app/health/checkup/create';

interface CheckupCardProps {
  checkup: Checkup;
  answers: CheckupAnswer[];
}

const CheckupCard: React.FC<CheckupCardProps> = ({ checkup, answers }) => {
  const router = useRouter();
  const checkUpCompleted = questions.length === answers.length;

  const getDateString = () => {
    const daysDifference = differenceInDays(new Date(), checkup.date);
    return !checkUpCompleted
      ? `BEGONNEN`
      : daysDifference < 1
        ? `HEUTE`
        : daysDifference > 182
          ? `ÄLTER ALS 6 MONATE`
          : `Vor ${daysDifference} Tagen`;
  };

  const getContinueString = () => {
    return checkUpCompleted ? `ANSEHEN` : `FORTSETZEN`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/health/checkup/${checkup.id}`)}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>
            {checkup.date.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
          <Text>{getDateString()}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.cardDate}>{getContinueString()}</Text>
          <ChevronIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.vitalGreen,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: Colors.light.darkGray,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18,
  },
  cardTitleContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardDate: {
    color: Colors.light.darkGray,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});

export default CheckupCard;
