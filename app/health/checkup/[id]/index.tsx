import RoundedButton from '@/components/RoundedButton';
import useCheckupStore from '@/stores/checkupStore';
import useDogStore from '@/stores/dogStore';
import { useLocalSearchParams } from 'expo-router';
import Text from '@/components/Text';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useMemo, useState } from 'react';
import { HorizontalLine } from '@/components/HorizontalLine';
import CheckupQuestionCard from '@/components/checkup/CheckupQuestionCard';
import Button from '@/components/Button';

export default function CheckupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dog = useDogStore((state) => state.dog);
  const [selectedFilter, setSelectedFilter] = useState('Alle');
  const checkup =
    useCheckupStore((state) => state.checkups).find(
      (c) => c.id === Number(id),
    ) ?? null;
  const questionsObject = useCheckupStore(
    (state) => state.checkupAnswers,
  ).filter((a) => a.checkup_id === Number(id));
  const [imageViewIsVisible, setImageViewIsVisible] = useState(false);
  const [imageViewData, setImageViewData] = useState({
    image: '',
    question: '',
  });

  const currentDate = new Date();
  const checkupDate = checkup?.date ?? new Date();
  const diffInYears = currentDate.getFullYear() - checkupDate.getFullYear();
  const status = diffInYears < 1 ? 'aktuell' : 'abgelaufen';

  const filter1 = 'Alle';
  const filter2 = 'Körper';
  const filter3 = 'Gangbild';
  const filter4 = 'Verhalten';

  const filter1IsSelected = selectedFilter === filter1;
  const filter2IsSelected = selectedFilter === filter2;
  const filter3IsSelected = selectedFilter === filter3;
  const filter4IsSelected = selectedFilter === filter4;

  const filteredQuestions = useMemo(() => {
    switch (selectedFilter) {
      case 'Alle':
        return questionsObject;
      case 'Körper':
        return questionsObject.filter(
          (q) => q.question_number === 8 || q.question_number === 9,
        );
      case 'Gangbild':
        return questionsObject.filter((q) => q.question_number === 9);
      case 'Verhalten':
        return questionsObject.filter(
          (q) =>
            q.question_number === 1 ||
            q.question_number === 2 ||
            q.question_number === 5,
        );
      default:
        return [];
    }
  }, [selectedFilter, questionsObject]);

  if (!dog || !checkup) {
    return (
      <View style={styles.container}>
        <Text>Checkup nicht gefunden</Text>
      </View>
    );
  }
  return (
    <>
      {!imageViewIsVisible ? (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title1}>Ergebnisse</Text>
              <Text style={styles.title2}>Vitaly Check Up</Text>
              <ScrollView
                contentContainerStyle={styles.filterContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <RoundedButton
                  text={filter1}
                  onPress={() => setSelectedFilter(filter1)}
                  selected={filter1IsSelected}
                  style={
                    !filter1IsSelected
                      ? { borderColor: Colors.light.mediumGreen }
                      : {}
                  }
                />
                <RoundedButton
                  text={filter2}
                  onPress={() => {
                    setSelectedFilter(filter2);
                  }}
                  selected={filter2IsSelected}
                  style={
                    !filter2IsSelected
                      ? { borderColor: Colors.light.mediumGreen }
                      : {}
                  }
                />
                <RoundedButton
                  text={filter3}
                  onPress={() => setSelectedFilter(filter3)}
                  selected={filter3IsSelected}
                  style={
                    !filter3IsSelected
                      ? { borderColor: Colors.light.mediumGreen }
                      : {}
                  }
                />
                <RoundedButton
                  text={filter4}
                  onPress={() => {
                    setSelectedFilter(filter4);
                  }}
                  selected={filter4IsSelected}
                  style={
                    !filter4IsSelected
                      ? { borderColor: Colors.light.mediumGreen }
                      : {}
                  }
                />
              </ScrollView>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>{status}</Text>
                <Text style={styles.subtitle}>
                  Check Up abgeschlossen am{' '}
                  {checkup.date.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <HorizontalLine />
            <Text style={styles.title3}>
              Deine Beobachtungen am Hundekörper
            </Text>

            {filteredQuestions.length > 0 && (
              <>
                {filteredQuestions
                  .sort((a, b) => a.question_number - b.question_number)
                  .map((question) => (
                    <CheckupQuestionCard
                      key={question.id}
                      questionsTotal={questionsObject.length}
                      questionObject={question}
                      setImageViewIsVisible={setImageViewIsVisible}
                      setImageViewData={setImageViewData}
                    />
                  ))}
              </>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.viewContainer}>
          <View style={styles.imageContainer}>
            <Text style={styles.question}>{imageViewData.question ?? ''}</Text>
            <Image
              source={{ uri: imageViewData?.image ?? '' }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              variant="secondary"
              title={'ZURÜCK'}
              onPress={() => setImageViewIsVisible(false)}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    gap: 0,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 0,
    marginBottom: 20,
    overflow: 'scroll',
  },
  title1: {
    color: Colors.light.lightGreen,
    fontFamily: 'Arkipelago',
    fontSize: 44,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 55,
  },
  title2: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: -10,
    marginBottom: 20,
    lineHeight: 40,
  },
  title3: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    color: Colors.light.darkGreen,
    marginTop: -10,
    marginBottom: 20,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
    overflow: 'scroll',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'column',
    gap: 40,
  },
  sectionTitle: {
    color: Colors.light.darkGray,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  questionContent: {
    flexDirection: 'column',
    gap: 10,
  },
  questionContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  questionHeaderContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  answerButton: {
    alignSelf: 'flex-start',
    minWidth: 'auto',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  viewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '90%',
    height: '54%',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: -50,
  },
  question: {
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignSelf: 'flex-start',
    flex: 1,
  },
});
