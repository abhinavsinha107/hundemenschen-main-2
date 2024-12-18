import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SearchResult {
  pageIndex: number;
  pageTitle: string;
  subPageIndex: number;
  subPageTitle: string;
  sectionIndex: number;
  sectionTitle: string;
  contentType: string;
  contentText: string;
}

interface Props {
  results: SearchResult[];
  searchText: string;
}
const buttonTitles = [
  'AKUTE SITUATIONEN',
  'VERGIFTUNG & GIFTIGES',
  'SYMPTOME ERKENNEN',
  'KONKRETE MASSNAHMEN',
  'VITALWERTE ÜBERPRÜFEN',
];

const SearchResults = ({ results, searchText }: Props) => {
  const handleNavigation = (page: number, index: number) => {
    router.push({
      pathname: '/medicalInfos/dynamicPage',
      params: { index: page, subIndex: index },
    });
  };
  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.staticText}>
          Suchbegriff: <Text style={styles.searchedTerm}>{searchText}</Text>
        </Text>
        <Text
          style={{
            fontFamily: 'Brother 1816 Printed',
            fontWeight: '300',
            fontSize: 12,
          }}
        >
          Suche beenden
        </Text>
      </View>
      {results?.map((item: SearchResult, index: number) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleNavigation(item.pageIndex, item.subPageIndex)}
            key={index}
            style={styles.container}
          >
            <View style={styles.roundedLine} />
            <View style={styles.innerContainer}>
              <Text numberOfLines={1} style={styles.highlightText}>
                {buttonTitles[item?.pageIndex]} | {item.subPageTitle}
              </Text>
              <HighlightText text={item.contentText} searchText={searchText} />
            </View>
          </TouchableOpacity>
        );
      })}
      {results?.length === 0 && (
        <View style={styles.container}>
          <View style={{ paddingVertical: 10, position: 'relative' }}>
            <Image
              source={require('@/assets/images/redcross.png')}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: '15%',
                left: '38%',
                zIndex: 10,
              }}
            />
            <Image
              source={require('@/assets/images/search.png')}
              style={{ alignSelf: 'center' }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <View>
              <Image
                source={require('@/assets/images/info.png')}
                style={{ alignSelf: 'center' }}
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                maxWidth: '95%',
                fontFamily: 'Brother 1816 Printed',
                fontWeight: '700',
                fontSize: 14,
                lineHeight: 17,
                color: '#000000',
              }}
            >
              Es konnten keine Ergebnisse gefunden werden.
            </Text>
          </View>
          <Text style={{ marginTop: 20, marginLeft: 31, marginBottom: 40 }}>
            Hilft dir das vielleicht weiter?
          </Text>
          {['Maulschlinge', 'Atemnot', 'Platzhalterkategorie'].map(
            (text, i) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/medicalInfos/dynamicPage',
                    params: { index: 0, subIndex: 0 },
                  })
                }
                style={{ marginLeft: 30 }}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.buttonTextContent}>{text}</Text>
                </View>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </ScrollView>
  );
};

const HighlightText = ({
  text,
  searchText,
}: {
  text: string;
  searchText: string;
}) => {
  const index = text.toLowerCase().indexOf(searchText.toLowerCase());
  if (index === -1) return <Text>{text}</Text>;

  const before = text.slice(Math.max(0, index - 20), index);
  const match = text.slice(index, index + searchText.length);
  const after = text.slice(
    index + searchText.length,
    index + searchText.length + 20,
  );

  return (
    <Text numberOfLines={1}>
      {before.length > 0 && <Text>... {before}</Text>}
      <Text style={styles.searchedTerm}>{match}</Text>
      {after.length > 0 && <Text>{after} ...</Text>}
    </Text>
  );
};

export default SearchResults;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 2,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 22,
  },
  highlightText: {
    color: '#899E33',
    fontWeight: 'bold',
  },
  searchedTerm: {
    color: 'black',
    fontWeight: 'bold',
  },
  roundedLine: {
    height: 2,
    backgroundColor: '#899E33',
    borderRadius: 15,
    width: '25%',
  },
  staticText: {
    marginBottom: 15,
    paddingHorizontal: 2,
  },
  buttonText: {
    backgroundColor: '#3B3B3B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonTextContent: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Brother 1816 Printed',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
