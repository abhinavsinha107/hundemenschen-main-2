import useDogStore from '@/stores/dogStore';
import Text from '@/components/Text';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button';
import ProgressBar from '../ProgressBar';
import RoundedButton from '../RoundedButton';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { UploadModal } from '../UploadModal';

// Define a more specific type for answer options
export type CheckupAnswerOption = {
  text: string;
  critical?: boolean;
};

export type CheckupQuestion = {
  number: number;
  title: string;
  answers: CheckupAnswerOption[];
};

// Updated answer type to include question reference
export type CheckupQuestionAnswer = {
  question: CheckupQuestion;
  answer: string;
  note?: string;
  critical?: boolean;
  image?: string;
};

type Props = {
  question: CheckupQuestion;
  index: number;
  maxIndex: number;
  selectedAnswer: CheckupQuestionAnswer | null;
  onAnswer: (answer: CheckupQuestionAnswer) => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
  onFinishClick: () => void;
  setImageData: (data: string | undefined) => void;
};

export default function CheckupQuestionView({
  question,
  index,
  maxIndex,
  selectedAnswer,
  onAnswer,
  onNextClick,
  onPreviousClick,
  onFinishClick,
  setImageData,
}: Props) {
  const dog = useDogStore((state) => state.dog);
  const [modalVisible, setModalVisible] = useState(false);

  const titleWithName = question.title.replace(
    /%s/g,
    dog?.call_name ?? 'Ihr Hund',
  );

  const changeNote = (note: string) => {
    if (!selectedAnswer) return;
    onAnswer({
      ...selectedAnswer,
      note,
    });
  };

  return (
    <View style={styles.mainContainer} key={question.title}>
      <ProgressBar value={index} max={maxIndex} />
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>{titleWithName}</Text>
          <Text style={styles.subtitleText}>
            Bitte zutreffendes auswählen oder eigene Eingabe tätigen.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            {question.answers.map((answer, index) => (
              <View key={index} style={styles.answerContainer}>
                <RoundedButton
                  text={answer.text}
                  onPress={() =>
                    onAnswer({
                      question,
                      answer: answer.text,
                      critical: answer.critical,
                    })
                  }
                  selected={selectedAnswer?.answer === answer.text}
                />
              </View>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <Text>Anmerkung</Text>
            <View style={styles.addNotesContainer}>
              <TextInput
                value={selectedAnswer?.note}
                onChangeText={changeNote}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={require('@/assets/images/addPicture.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {index > 0 ? (
              <Button
                title="ZURÜCK"
                onPress={onPreviousClick}
                variant="secondary"
              />
            ) : (
              <View />
            )}

            <Button
              title={index === maxIndex ? 'ABSCHLIESSEN' : 'WEITER'}
              onPress={index === maxIndex ? onFinishClick : onNextClick}
              variant="primary"
              disabled={selectedAnswer?.answer === undefined}
            />
          </View>
        </View>
      </View>
      <UploadModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        onImageSelected={(image) => {
          setImageData(image);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 24,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 25,
    fontWeight: '500',
  },
  subtitleText: {
    fontWeight: '400',
  },
  bottomContainer: {
    flexDirection: 'column',
    gap: 24,
  },
  answerContainer: {
    padding: 5,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    display: 'flex',
    height: 40,
    paddingVertical: 9,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 30,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: Colors.light.lightGreen,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  addNotesContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  icon: {
    marginTop: 5,
  },
});
