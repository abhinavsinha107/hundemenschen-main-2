import React from 'react';
import Text from '@/components/Text';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import useDogStore from '@/stores/dogStore';
import { CheckupAnswer } from '@/db/schema';

interface CardProps {
  questionsTotal: number;
  questionObject: CheckupAnswer;
  setImageViewIsVisible?: (boolean) => void;
  setImageViewData?: (string) => void;
}

const CheckupQuestionCard: React.FC<CardProps> = ({
  questionsTotal,
  questionObject,
  setImageViewIsVisible,
  setImageViewData,
}) => {
  const { dog } = useDogStore();
  const questionTitle = questionObject.question_title.replace(
    /%s/,
    dog?.call_name ?? 'deinem Hund',
  );

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardTitleContainer}>
            <Text>
              Frage {questionObject.question_number} / {questionsTotal}
            </Text>
            <Text style={styles.cardTitle}>{questionTitle}</Text>
            <Text style={styles.cardAnswer}>{questionObject.answer}</Text>
            {questionObject.note && (
              <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>Eigene Anmerkung:</Text>
                <Text style={styles.noteText}>{questionObject.note}</Text>
              </View>
            )}
            {questionObject.image &&
              setImageViewIsVisible &&
              setImageViewData && (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setImageViewData({
                        image: questionObject?.image,
                        question: questionTitle,
                      });
                      setImageViewIsVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: questionObject?.image }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.edit}>
        <Text style={styles.editText}>eintragen</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  edit: {
    marginTop: 5,
    marginBottom: 20,
    width: '100%',
  },
  editText: {
    color: Colors.light.darkGray,
    fontSize: 12,
    alignSelf: 'flex-end',
    right: 20,
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
  },
  cardAnswer: {
    marginTop: 10,
    color: Colors.light.darkGray,
    fontSize: 18,
    fontWeight: '700',
  },
  noteTitle: {
    color: Colors.light.mediumGreen,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14,
  },
  noteText: {
    color: Colors.light.darkGray,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  noteContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
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
  image: {
    height: 50,
    width: 50,
    borderRadius: 7,
    marginTop: 10,
  },
});

export default CheckupQuestionCard;
