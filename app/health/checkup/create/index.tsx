import CheckupQuestionView, {
  CheckupQuestion,
  CheckupQuestionAnswer,
} from '@/components/checkup/CheckupQuestionView';
import useCheckupStore from '@/stores/checkupStore';
import useDogStore from '@/stores/dogStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import usePrevious from 'use-previous';

// Define type for the answers map
type CheckupAnswers = Map<number, CheckupQuestionAnswer>;

export const questions: CheckupQuestion[] = [
  {
    number: 1,
    title: 'Hat sich das Trinkverhalten von %s geändert?',
    answers: [
      {
        text: 'Nein, unverändert',
      },
      {
        text: 'Ja, trinkt mehr als sonst',
      },
      {
        text: 'Ja, trinkt weniger als sonst',
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 2,
    title: 'Hat sich das Fressverhalten von %s geändert?',
    answers: [
      {
        text: 'Nein, unverändert',
      },
      {
        text: 'Ja, frisst mehr als sonst',
      },
      {
        text: 'Ja, frisst weniger als sonst',
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 3,
    title: 'Hat %s Durchfall?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
        critical: true,
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 4,
    title: 'Hat %s Erbrechen?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
        critical: true,
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 5,
    title: 'Hat %s Auffälligkeiten im Verhalten?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 6,
    title: 'Hat %s Auffälligkeiten im Kot?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
        critical: true,
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 7,
    title: 'Hat %s Auffälligkeiten im Urin?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
        critical: true,
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 8,
    title: 'Hat %s Auffälligkeiten im Fell?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
  {
    number: 9,
    title: 'Hat %s Auffälligkeiten im Gewicht?',
    answers: [
      {
        text: 'Nein',
      },
      {
        text: 'Ja',
      },
      {
        text: 'Ich bin mir nicht sicher',
      },
    ],
  },
];

export default function Index() {
  const dog = useDogStore((state) => state.dog);
  const createNewCheckup = useCheckupStore((state) => state.createNewCheckup);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<CheckupAnswers>(new Map());
  const [imageData, setImageData] = useState<string | undefined>('NIX');
  const prevActiveQuestionIndex = usePrevious(activeQuestionIndex);

  useEffect(() => {
    if (prevActiveQuestionIndex !== activeQuestionIndex) {
      setImageData(undefined);
    }
  }, [activeQuestionIndex, prevActiveQuestionIndex]);

  const onFinished = async () => {
    if (!dog) return;

    try {
      // Convert answers to database format
      const checkupAnswers = Array.from(answers.values()).map((answer) => ({
        question_title: answer.question.title,
        question_number: answer.question.number,
        answer: answer.answer,
        note: answer.note,
        image: answer.image,
        critical: answer.critical ?? false,
      }));

      // Use the store to create the checkup
      await createNewCheckup(dog.id, checkupAnswers);

      router.replace('/health/checkup');
    } catch (error) {
      console.error('Failed to save checkup:', error);
      // Handle error appropriately
    }
  };

  const onAnswer = (answer) => {
    setAnswers(
      (prev) =>
        new Map(
          prev.set(activeQuestionIndex, {
            ...answer,
            question: questions[activeQuestionIndex],
            image: imageData,
          }),
        ),
    );
  };

  if (!questions[activeQuestionIndex]) {
    return null;
  }

  return (
    <CheckupQuestionView
      key={activeQuestionIndex}
      question={questions[activeQuestionIndex]}
      index={activeQuestionIndex}
      maxIndex={questions.length - 1}
      onAnswer={(answer) => onAnswer(answer)}
      setImageData={(image) => setImageData(image)}
      selectedAnswer={answers.get(activeQuestionIndex) ?? null}
      onNextClick={() => {
        onAnswer(answers.get(activeQuestionIndex));
        setActiveQuestionIndex(activeQuestionIndex + 1);
      }}
      onPreviousClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
      onFinishClick={() => {
        onAnswer(answers.get(activeQuestionIndex));
        onFinished();
      }}
    />
  );
}
