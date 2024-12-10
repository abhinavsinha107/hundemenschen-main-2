import { Colors } from '@/constants/Colors';
import { StyleSheet, View, Image } from 'react-native';
import Text from '@/components/Text';

type VetPreviewElementProps = {
  number: string;
  title: string;
  isPrimaryVet?: boolean;
};

export function VetPreviewElement({
  number,
  title,
  isPrimaryVet,
}: VetPreviewElementProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.number}>{number + '.'}</Text>
          <Text style={styles.title}>{'Praxisname ' + title}</Text>
        </View>
        {isPrimaryVet && (
          <View style={styles.primaryVetContainer}>
            <Image
              source={require('@/assets/images/doneArrowGreen.png')}
              style={{
                width: 16,
                height: 12,
                transform: [{ translateY: +6 }],
              }}
            />
            <Text style={styles.primaryVet}>STAMMPRAXIS</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginTop: 10,
    // shadowColor: Colors.light.darkGray,
    // shadowOpacity: 0.25,
    // shadowRadius: 1,
    // elevation: 10,
    // shadowOffset: { width: 0, height: 6 },
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    backgroundColor: 'none',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.darkGray,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.mediumGreen,
    marginRight: 5,
  },
  primaryVetContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  primaryVet: {
    fontSize: 14,
    fontWeight: '100',
    color: Colors.light.darkGray,
  },
});
