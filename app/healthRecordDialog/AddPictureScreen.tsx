import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Text from '@/components/Text';
import { UploadModal } from '@/components/UploadModal';
import { router } from 'expo-router';
import { useImageDataContext } from '@/hooks/ImageDataContext';
import useDogStore from '@/stores/dogStore';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';

export default function AddPictureScreen() {
  const { imageData } = useImageDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { dog } = useDogStore();
  const imageObject = { uri: dog?.image ?? imageData };

  return (
    <>
      <View style={styles.greenWrapper}>
        {!!dog?.image || imageData ? (
          <View style={styles.greenWrapper}>
            <ImageBackground
              source={imageObject}
              style={styles.backgroundImage}
              resizeMode="cover"
              blurRadius={10}
            >
              <View style={styles.overlay}>
                <View style={styles.imageContainer}>
                  <Image
                    source={imageObject}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.changeButtonContainer}>
                <Button
                  title={'BILD ÄNDERN'}
                  onPress={() => setModalVisible(true)}
                  variant="secondary"
                />
              </View>
              <View style={styles.continueButtonContainer}>
                <Button
                  title={'WEITER'}
                  onPress={() => router.navigate('../forms/schnellprofil')}
                  variant="tertiary"
                />
              </View>
            </ImageBackground>
          </View>
        ) : (
          <>
            <View style={styles.skipButtonContainer}>
              <TouchableOpacity
                onPress={() => router.navigate('../forms/schnellprofil')}
              >
                <Text style={styles.skipButtonText}>ÜBERSPRINGEN</Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.greenWrapper, alignItems: 'center' }}>
              <View style={styles.cameraContainer}>
                <Image
                  source={require('@/assets/images/cameraDrawing.png')}
                  style={{ width: 180 }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.addButtonContainer}>
                <Button
                  title={'+'}
                  onPress={() => setModalVisible(true)}
                  isCircle
                  variant="tertiary"
                />
              </View>
              <Text style={styles.instructionText}>
                Füge ein Profilbild von deinem Hund hinzu.
              </Text>
            </View>
          </>
        )}
      </View>
      <UploadModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  greenWrapper: {
    height: '100%',
    backgroundColor: Colors.light.vitalGreen,
  },
  backgroundImage: {
    height: '100%',
  },
  overlay: {
    alignItems: 'center',
    width: '90%',
    height: '45%',
    marginTop: '17%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  cameraContainer: {
    marginTop: '10%',
  },
  addButtonContainer: {
    margin: 20,
    marginTop: '15%',
  },
  addButton: {
    borderRadius: 70,
    width: 70,
    height: 70,
    backgroundColor: Colors.light.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.light.white,
    fontWeight: '300',
    fontSize: 40,
    marginTop: -4,
  },
  instructionText: {
    width: '50%',
    color: Colors.light.darkGray,
    textAlign: 'center',
  },
  changeButtonContainer: {
    margin: 20,
    marginTop: '5%',
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    color: Colors.light.darkGray,
    fontWeight: '600',
    fontSize: 15,
  },
  continueButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '4%',
    bottom: '6%',
  },
  continueButtonWrapper: {
    margin: 20,
    marginTop: '30%',
    alignSelf: 'flex-end',
  },
  continueButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.light.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  continueButtonText: {
    color: Colors.light.white,
    fontWeight: '400',
    fontSize: 15,
    marginTop: -4,
  },
  skipButtonContainer: {
    paddingTop: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: '4%',
  },
  skipButtonText: {
    fontSize: 12,
  },
});
