import { useImageDataContext } from '@/hooks/ImageDataContext';
import React from 'react';
import Text from '@/components/Text';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export function UploadModal({
  visible,
  closeModal,
  onImageSelected,
}: {
  visible?: boolean;
  closeModal: () => void;
  onImageSelected?: (imageUri: string) => void;
}) {
  const { pickImageFromGallery, pickImageFromCamera } = useImageDataContext();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bild hochladen</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await pickImageFromGallery(
                onImageSelected
                  ? (imageUri) => onImageSelected(imageUri)
                  : undefined,
              );
              closeModal();
            }}
          >
            <Text style={styles.buttonText}>Aus Galerie wählen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await pickImageFromCamera(
                onImageSelected
                  ? (imageUri) => onImageSelected(imageUri)
                  : undefined,
              );
              closeModal();
            }}
          >
            <Text style={styles.buttonText}>Kamera verwenden</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelButtonText}>Abbrechen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.light.darkGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: Colors.light.darkGray,
    fontSize: 16,
  },
});
