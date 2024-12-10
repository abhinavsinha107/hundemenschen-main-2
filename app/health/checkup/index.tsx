import CheckupCard from '@/components/checkup/CheckupCard';
import useCheckupStore from '@/stores/checkupStore';
import useDogStore from '@/stores/dogStore';
import { useEffect } from 'react';
import Text from '@/components/Text';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import { InsertCheckupAnswer } from '@/db/schema';
import { questions } from './create';

export default function Index() {
  const router = useRouter();
  const dog = useDogStore((state) => state.dog);
  const checkups = useCheckupStore((state) => state.checkups);
  const answers = useCheckupStore((state) => state.checkupAnswers);
  const fetchCheckups = useCheckupStore((state) => state.fetchCheckups);
  const deleteCheckups = useCheckupStore((state) => state.deleteCheckups);
  const createNewCheckup = useCheckupStore((state) => state.createNewCheckup);

  const sortedCheckups = checkups?.sort((a, b) => {
    // Anzahl der Antworten für jedes Checkup
    const aAnswersCount = answers.filter(
      (answer) => answer.checkup_id === a.id,
    ).length;
    const bAnswersCount = answers.filter(
      (answer) => answer.checkup_id === b.id,
    ).length;

    // Überprüfen, ob die Anzahl der Antworten und Fragen unterschiedlich ist
    const aMismatch = aAnswersCount !== questions.length;
    const bMismatch = bAnswersCount !== questions.length;

    // Zuerst nach der Anzahl der Antworten und Fragen sortieren
    if (aMismatch && !bMismatch) {
      return -1; // a kommt vor b
    }
    if (!aMismatch && bMismatch) {
      return 1; // b kommt vor a
    }
    return 0;
  });

  const checkupAnswers: Omit<InsertCheckupAnswer, 'checkup_id'>[] = [
    {
      question_title: 'Hat sich das Trinkverhalten von %s geändert?',
      question_number: 1,
      answer: 'Ja, trinkt mehr als sonst',
      note: 'Der Hund trinkt seit kurzem deutlich mehr Wasser.',
      critical: false,
    },
    {
      question_title: 'Hat sich das Fressverhalten von %s geändert?',
      question_number: 2,
      answer: 'Nein, unverändert',
      note: 'Frisst normal, keine Änderungen.',
      critical: false,
    },
    {
      question_title: 'Hat %s Durchfall?',
      question_number: 3,
      answer: 'Ja',
      note: 'Durchfall trat gestern auf, sollte beobachtet werden.',
      critical: true,
    },
    {
      question_title: 'Hat %s Erbrechen?',
      question_number: 4,
      answer: 'Nein',
      note: 'Kein Erbrechen in den letzten Tagen.',
      critical: false,
    },
    {
      question_title: 'Hat %s Auffälligkeiten im Verhalten?',
      question_number: 5,
      answer: 'Ja',
      note: 'Der Hund wirkt lethargischer als gewöhnlich.',
      critical: true,
    },
    {
      question_title: 'Hat %s Auffälligkeiten im Kot?',
      question_number: 6,
      answer: 'Ja',
      note: 'Der Kot hat eine ungewöhnliche Farbe.',
      critical: true,
    },
    {
      question_title: 'Hat %s Auffälligkeiten im Urin?',
      question_number: 7,
      answer: 'Nein',
      note: 'Der Urin sieht normal aus.',
      critical: false,
    },
    {
      question_title: 'Hat %s Auffälligkeiten im Fell?',
      question_number: 8,
      answer: 'Ja',
      note: 'Das Fell wirkt stumpf und hat vermehrt Haarausfall.',
      critical: false,
    },
    {
      question_title: 'Hat %s Auffälligkeiten im Gewicht?',
      question_number: 9,
      answer: 'Ja',
      note: 'Der Hund hat in letzter Zeit etwas an Gewicht verloren.',
      critical: false,
    },
  ];

  useEffect(() => {
    if (dog) {
      fetchCheckups(dog.id);
    }
  }, [dog, fetchCheckups]);

  if (!dog) {
    return (
      <View style={styles.container}>
        <Text>No dog selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text style={styles.mainText}>Check Up</Text>
            <Text style={styles.subText}>Ergebnisse</Text>
          </View>
          <Text style={styles.description}>
            Dokumentiere die Gesundheit von {dog.call_name} und führe
            regelmäßige Beobachtungs-Check ups durch.
          </Text>
        </View>
        <View style={styles.checkupsContainer}>
          {sortedCheckups?.length > 0 ? (
            <>
              {sortedCheckups.map((checkup) => (
                <CheckupCard
                  key={checkup.id}
                  checkup={checkup}
                  answers={answers.filter((a) => a.checkup_id === checkup.id)}
                />
              ))}
            </>
          ) : (
            <Text>Noch keine Ergebnisse vorhanden.</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: 'green' }]}
          onPress={async () => {
            const previousDate = new Date();
            previousDate.setDate(new Date().getDate() - 2);
            await createNewCheckup(dog.id, checkupAnswers, previousDate);
            previousDate.setDate(new Date().getDate() - 300);
            await createNewCheckup(dog.id, checkupAnswers, previousDate);
            previousDate.setDate(-100);
            await createNewCheckup(
              dog.id,
              checkupAnswers.slice(0, 2),
              previousDate,
            );
          }}
        >
          <Text style={styles.nextButtonText}>ADD CHECKUPS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={async () => await deleteCheckups()}
        >
          <Text style={styles.nextButtonText}>DELETE CHECKUPS</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.fab}>
        <Button
          title={'+'}
          onPress={() => router.push('/health/checkup/create')}
          isCircle
          isSmalll
          variant="tertiary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 40,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    flexDirection: 'column',
  },
  mainText: {
    color: Colors.light.lightGreen,
    fontFamily: 'Arkipelago',
    fontSize: 44,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 55,
  },
  subText: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: -10,
    marginBottom: 5,
    lineHeight: 40,
  },
  description: {
    color: Colors.light.darkGray,
    fontSize: 12,
    fontWeight: 400,
  },
  checkupsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  nextButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  nextButtonText: {
    fontSize: 14,
    color: Colors.light.white,
  },
});
