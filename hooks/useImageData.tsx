import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useDogStore from '@/stores/dogStore';

export type ImageDataProps = {
  imageData: string | undefined;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  saveImage: (imageUri: string) => void;
  pickImageFromGallery: (callback?: (uri: string) => void) => Promise<void>;
  pickImageFromCamera: (callback?: (uri: string) => void) => Promise<void>;
};

export const useImageData = (): ImageDataProps => {
  const [imageData, setImageData] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const { setDog, dog } = useDogStore();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const saveImage = (imageUri: string) => {
    // eslint-disable-next-line no-unused-expressions
    setImageData(imageUri);
    dog && setDog({ ...dog, image: imageUri });
    closeModal();
  };
  const pickImageFromGallery = async (callback?: (uri: string) => void) => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        callback ? callback(uri) : saveImage(uri);
      }
    } catch (error) {
      alert('Fehler beim Auswählen eines Bildes.');
    }
  };

  const pickImageFromCamera = async (callback?: (uri: string) => void) => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        callback ? callback(uri) : saveImage(uri);
      }
    } catch (error) {
      alert('Fehler beim Verwenden der Kamera.');
    }
  };

  // set state to undefined if image gets deleted
  useEffect(() => {
    !dog?.image && setImageData(undefined);
  }, [dog?.image]);

  return {
    imageData,
    showModal,
    openModal,
    closeModal,
    saveImage,
    pickImageFromGallery,
    pickImageFromCamera,
  };
};
