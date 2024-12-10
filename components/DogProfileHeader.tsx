import React, { memo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Text from '@/components/Text';
import { UploadModal } from './UploadModal';
import { router } from 'expo-router';
import useDogStore from '@/stores/dogStore';
import { useImageDataContext } from '@/hooks/ImageDataContext';
import { Colors } from '@/constants/Colors';

const { height: screenHeight } = Dimensions.get('screen');

export const DogProfileHeader = memo(function DialogHeader({
  subTitle,
  title,
  emptyHeader,
}: {
  subTitle?: string;
  title?: string;
  emptyHeader?: boolean;
}) {
  const { imageData } = useImageDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const dog = useDogStore((state) => state.dog);
  const imageURL = dog?.image ?? imageData;

  return (
    <>
      <View
        style={{
          ...styles.headerContainer,
          height: !emptyHeader ? screenHeight * 0.135 : screenHeight * 0.05,
          backgroundColor: Colors.light.background,
          ...(Platform.OS === 'ios'
            ? {
                shadowColor: Colors.light.black,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: !emptyHeader ? 0.1 : 0, // Reduzierte opacity für iOS
                shadowRadius: 10,
              }
            : {
                elevation: !emptyHeader ? 12 : 0,
              }),
        }}
      >
        {!emptyHeader && (
          <>
            <Text style={styles.subTitleText}>{subTitle}</Text>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image
                source={require('@/assets/images/backButton.png')}
                style={styles.backButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      {!emptyHeader && (
        <View style={styles.upperCircleWrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {imageURL ? (
              <Image source={{ uri: imageURL }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholder} />
            )}
          </TouchableOpacity>
          <UploadModal
            visible={modalVisible}
            closeModal={() => setModalVisible(false)}
          />
        </View>
      )}

      <View
        style={
          emptyHeader ? { height: screenHeight * 0.135 } : styles.lowerCircle
        }
      />
    </>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
    zIndex: 2,
  },
  subTitleText: {
    fontSize: 12,
    color: Colors.light.black,
  },
  titleText: {
    fontSize: 24,
    marginTop: 5,
    lineHeight: 28,
  },
  backButton: {
    width: 20,
    position: 'absolute',
    alignSelf: 'flex-start',
    left: 30,
    bottom: 20,
  },
  backButtonImage: {
    width: 12.5,
    height: 12.5,
  },
  upperCircleWrapper: {
    position: 'absolute',
    top: screenHeight * 0.07,
    right: 8,
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 15,
    borderColor: Colors.light.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.white,
    zIndex: 3,
    elevation: 0,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
  },
  placeholder: {
    width: 85,
    height: 85,
    backgroundColor: Colors.light.vitalGreen,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerCircle: {
    position: 'absolute',
    top: screenHeight * 0.07,
    right: 8,
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    zIndex: 1,
    elevation: 12,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
