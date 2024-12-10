import { Colors } from '@/constants/Colors';
import { View } from 'react-native';

export const HorizontalLine: React.FC = () => {
  return (
    <View
      style={{
        marginVertical: 15,
        width: 50,
        borderBottomColor: Colors.light.mediumGreen,
        borderBottomWidth: 2,
      }}
    />
  );
};
