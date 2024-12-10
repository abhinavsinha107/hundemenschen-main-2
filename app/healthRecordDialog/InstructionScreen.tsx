import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Text from '@/components/Text';

const { width } = Dimensions.get('window');

export default function InstructionScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('@/assets/images/placeholder.png'),
    require('@/assets/images/placeholder.png'),
    require('@/assets/images/placeholder.png'),
  ];

  const titles = [
    'Persönliches Gesundheits-Board',
    'Vitality Check-Up Fragebogen',
    'Notfallwissen und Erste-Hilfe',
  ];

  const introTexts = [
    'Vitalityboard individualisieren und ausführliches Gesundheitsprofil erstellen',
    'Den Hund richtig beobachten und Auffälligkeiten erkennen.',
    'Immer offline dabei!',
  ];

  const renderPagination = () => (
    <View style={styles.pagination}>
      {images.map((_, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
      })}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{titles[index]}</Text>
        </View>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>{introTexts[index]}</Text>
        </View>
      </View>
      <Image source={item} style={styles.image} />
    </View>
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      },
    },
  );

  return (
    <>
      <View style={styles.skipButtonContainer}>
        <TouchableOpacity onPress={() => router.navigate('../adddog/')}>
          <Text style={styles.skipButtonText}>überspringen</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />
        {renderPagination()}
      </View>

      {currentIndex === images.length - 1 && (
        <View style={styles.continueButtonContainer}>
          <Button
            title={'JETZT LOSLEGEN'}
            onPress={() => router.navigate('../adddog/')}
            variant="tertiary"
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 0,
    maxHeight: '80%',
  },
  titleText: {
    color: Colors.light.darkGray,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  introText: {
    color: Colors.light.darkGray,
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    width: width,
    alignItems: 'center',
    height: '95%',
    paddingVertical: 30,
  },
  image: {
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.vitalGreen,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 26,
    alignItems: 'center',
    minHeight: 140,
    width: '95%',
  },
  titleContainer: {
    paddingHorizontal: 20,
    width: '65%',
  },
  introContainer: {
    paddingHorizontal: 20,
    paddingTop: 5,
    width: '100%',
    height: 70,
  },
  skipButtonContainer: {
    display: 'flex',
    alignSelf: 'flex-end',
    right: '4%',
    top: 0,
  },
  skipButtonText: {
    fontSize: 12,
  },
  continueButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '4%',
    bottom: '6%',
  },
});
