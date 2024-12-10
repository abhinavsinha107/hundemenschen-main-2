import { Colors } from '@/constants/Colors';
import { useImageDataContext } from '@/hooks/ImageDataContext';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import { UploadModal } from './UploadModal';
import { useState } from 'react';

export function VitalityboardCard({ dog, type = '' }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { imageData } = useImageDataContext();
  const imageURL = dog.image ?? imageData;

  return (
    <View style={[styles.container, type != 'image' && { paddingTop: 28 }]}>
      <View style={styles.content}>
        {type === 'image' ? (
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {imageURL ? (
                <Image source={{ uri: imageURL }} style={styles.image} />
              ) : (
                <View style={[styles.placeholder, styles.image]} />
              )}
            </TouchableOpacity>
            <UploadModal
              visible={modalVisible}
              closeModal={() => setModalVisible(false)}
            />
          </>
        ) : (
          <View
            style={{
              width: 172,
              height: 148,
              padding: 10,
            }}
          >
            <Text>Vitalityboard Card</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.light.vitalGreen,
  },
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.light.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 10,
  },
  image: {
    height: 172,
    width: 172,
  },
});
