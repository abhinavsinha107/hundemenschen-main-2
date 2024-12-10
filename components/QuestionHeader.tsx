import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';

interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  isCritical?: boolean;
}

export default function QuestionHeader({
  questionNumber,
  totalQuestions,
  isCritical = false,
}: QuestionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        FRAGE {questionNumber}/{totalQuestions}
      </Text>
      <View
        style={[styles.line, isCritical ? styles.redLine : styles.greenLine]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  questionText: {
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Colors.light.mediumGray,
  },
  line: {
    flex: 1,
    height: 2,
  },
  redLine: {
    backgroundColor: Colors.light.attentionRed,
  },
  greenLine: {
    backgroundColor: Colors.light.lightGreen,
  },
});
