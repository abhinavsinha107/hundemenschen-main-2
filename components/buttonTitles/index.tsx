import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ButtonTitlesProps {
  buttonTitles: Array<string>;
  navigationPaths?: Array<string>;
  isUnterkategorie: boolean;
  page?: any;
}

const ButtonTitles = ({
  buttonTitles,
  navigationPaths,
  isUnterkategorie,
  page,
}: ButtonTitlesProps) => {
  const router = useRouter();

  const handleButtonClick = (index: number) => {
    if (isUnterkategorie) {
      router.push({
        pathname: '/medicalInfos/dynamicPage',
        params: { index: page, subIndex: index },
      });
    } else {
      const path = navigationPaths && (navigationPaths[index] as any);
      router.push({
        pathname: path,
        params: { page: index },
      });
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {buttonTitles.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleButtonClick(index)}
            style={{
              backgroundColor: isUnterkategorie ? '#C2DE4C' : '#fff',
              borderRadius: 10,
              padding: 15,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: isUnterkategorie ? 0 : 4,
              height: 60,
              marginHorizontal: 1,
              marginTop: 3,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                fontFamily: 'Brother 1816 Printed',
                lineHeight: 29,
                letterSpacing: 1,
                paddingLeft: '20%',
                textTransform: 'uppercase',
              }}
            >
              {item}
            </Text>
            <Text style={{ fontSize: 20, color: '#6d9e31' }}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ButtonTitles;
