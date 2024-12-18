import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import HeroSection from '@/components/heroSection';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';

const data = require('../../constants/data.json');

export default function Index() {
  const router = useRouter();
  const { index, subIndex } = useLocalSearchParams();
  const page =
    data.pages[Number(index) as any].subPages[Number(subIndex) as any];

  const [showHeroSection, setShowHeroSection] = useState(true);

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{ position: 'static', top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        {/* <AppBar bottomTitle="Einzelseite" /> */}
      </View>
      {showHeroSection && (
        <HeroSection
          isUnterkategorie={false}
          isDynamicPage={true}
          setShowHeroSection={setShowHeroSection}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#E9E8E8', paddingVertical: 10 }}>
          <Image
            source={require('@/assets/images/cross.png')}
            style={{ alignSelf: 'center' }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.pageTitle}>{page.title}</Text>
          {page.sections.map((section: any, sectionIndex: any) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Pressable
                style={styles.header}
                onPress={() => toggleExpand(section.id)}
              >
                <View style={styles.topHeader}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.title}>
                      {String.fromCharCode(64 + sectionIndex + 1)}.
                    </Text>
                    <Text style={{ ...styles.title, marginLeft: '22%' }}>
                      {section.title}
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      expandedItems[section.id] ? 'expand-less' : 'expand-more'
                    }
                    size={24}
                    color="black"
                  />
                </View>
                {expandedItems[section.id] &&
                  section.content.map((item: any, idx: any) => {
                    switch (item.type) {
                      case 'bullet':
                        return (
                          <View key={idx} style={styles.bulletContainer}>
                            <Feather name="check" size={24} color="#899E33" />
                            <Text style={styles.bulletPoint}>
                              {item.content}
                            </Text>
                          </View>
                        );
                      case 'highlightedText':
                        return (
                          <Text key={idx} style={styles.highlightedText}>
                            {item.text}
                          </Text>
                        );
                      case 'buttonText':
                        return (
                          <TouchableOpacity
                            key={idx}
                            onPress={() =>
                              router.push({
                                pathname: '/medicalInfos/dynamicPage',
                                params: { index, subIndex },
                              })
                            }
                          >
                            <View style={styles.buttonText}>
                              <Text style={styles.buttonTextContent}>
                                {item.content}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      case 'redLine':
                        return <View key={idx} style={styles.redLine}></View>;
                      case 'simpleText':
                        return (
                          <View key={idx}>
                            <Text style={styles.simpleTextContent}>
                              {item.content}
                            </Text>
                          </View>
                        );
                      case 'paragraph':
                        return (
                          <View key={idx}>
                            <Text style={styles.paragraph}>{item.content}</Text>
                          </View>
                        );
                      case 'subTopic':
                        return (
                          <View key={idx}>
                            {item.content.map((subItem: any, subIdx: any) => {
                              return subItem.content.map(
                                (
                                  subItemContent: any,
                                  subItemContentIdx: any,
                                ) => {
                                  switch (subItemContent.type) {
                                    case 'subHeading':
                                      return (
                                        <View key={subItemContentIdx}>
                                          <Text style={styles.subHeading}>
                                            <Text style={{ color: '#899E33' }}>
                                              {String.fromCharCode(
                                                64 + sectionIndex + 1,
                                              )}
                                              .{subIdx + 1}{' '}
                                            </Text>
                                            {subItemContent.text}
                                          </Text>
                                        </View>
                                      );
                                    case 'bullet':
                                      return (
                                        <View
                                          key={subItemContentIdx}
                                          style={styles.bulletContainer}
                                        >
                                          <Feather
                                            name="check"
                                            size={24}
                                            color="#899E33"
                                          />
                                          <Text style={styles.bulletPoint}>
                                            {subItemContent.content}
                                          </Text>
                                        </View>
                                      );
                                    case 'buttonText':
                                      return (
                                        <TouchableOpacity
                                          key={subItemContentIdx}
                                          onPress={() =>
                                            router.push({
                                              pathname:
                                                '/medicalInfos/dynamicPage',
                                              params: { index, subIndex },
                                            })
                                          }
                                        >
                                          <View style={styles.buttonText}>
                                            <Text
                                              style={styles.buttonTextContent}
                                            >
                                              {subItemContent.content}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      );
                                    case 'paragraph':
                                      return (
                                        <View key={subItemContentIdx}>
                                          <Text style={styles.paragraph}>
                                            {subItemContent.content}
                                          </Text>
                                        </View>
                                      );
                                    case 'errorWarning':
                                      return (
                                        <View
                                          key={subItemContentIdx}
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: 10,
                                            marginBottom: 20,
                                          }}
                                        >
                                          <View>
                                            <Image
                                              source={require('@/assets/images/info.png')}
                                              style={{ alignSelf: 'center' }}
                                            />
                                          </View>
                                          <Text style={styles.errorWarning}>
                                            {subItemContent.content}
                                          </Text>
                                        </View>
                                      );
                                    case 'subTopic':
                                      return (
                                        <View key={subItemContentIdx}>
                                          {subItemContent.content.map(
                                            (
                                              subSubItem: any,
                                              subSubIdx: any,
                                            ) => {
                                              return subSubItem.content.map(
                                                (
                                                  subSubItemContent: any,
                                                  subSubItemContentIdx: any,
                                                ) => {
                                                  switch (
                                                    subSubItemContent.type
                                                  ) {
                                                    case 'subHeading':
                                                      return (
                                                        <View
                                                          key={
                                                            subSubItemContentIdx
                                                          }
                                                        >
                                                          <Text
                                                            style={
                                                              styles.subHeading
                                                            }
                                                          >
                                                            <Text
                                                              style={{
                                                                color:
                                                                  '#899E33',
                                                              }}
                                                            >
                                                              {String.fromCharCode(
                                                                64 +
                                                                  sectionIndex +
                                                                  1,
                                                              )}
                                                              .{subIdx + 1}.
                                                              {subSubIdx + 1}{' '}
                                                            </Text>
                                                            {
                                                              subSubItemContent.text
                                                            }
                                                          </Text>
                                                        </View>
                                                      );
                                                    case 'bullet':
                                                      return (
                                                        <View
                                                          key={
                                                            subSubItemContentIdx
                                                          }
                                                          style={
                                                            styles.bulletContainer
                                                          }
                                                        >
                                                          <Feather
                                                            name="check"
                                                            size={24}
                                                            color="#899E33"
                                                          />
                                                          <Text
                                                            style={
                                                              styles.bulletPoint
                                                            }
                                                          >
                                                            {
                                                              subSubItemContent.content
                                                            }
                                                          </Text>
                                                        </View>
                                                      );
                                                    case 'buttonText':
                                                      return (
                                                        <TouchableOpacity
                                                          key={
                                                            subSubItemContentIdx
                                                          }
                                                          onPress={() =>
                                                            router.push({
                                                              pathname:
                                                                '/medicalInfos/dynamicPage',
                                                              params: {
                                                                index,
                                                                subIndex,
                                                              },
                                                            })
                                                          }
                                                        >
                                                          <View
                                                            style={
                                                              styles.buttonText
                                                            }
                                                          >
                                                            <Text
                                                              style={
                                                                styles.buttonTextContent
                                                              }
                                                            >
                                                              {
                                                                subSubItemContent.content
                                                              }
                                                            </Text>
                                                          </View>
                                                        </TouchableOpacity>
                                                      );
                                                    case 'image':
                                                      return (
                                                        <Image
                                                          key={
                                                            subSubItemContentIdx
                                                          }
                                                          source={
                                                            subSubItemContent.type ===
                                                              'image' &&
                                                            subSubItemContent.content.includes(
                                                              '@/assets/images/',
                                                            )
                                                              ? require('@/assets/images/dog.png')
                                                              : null
                                                          }
                                                          style={{
                                                            alignSelf: 'center',
                                                            marginVertical: 10,
                                                          }}
                                                        />
                                                        // <Image key={subSubItemContentIdx} source={{ uri: 'https://lh3.googleusercontent.com/9tLfTpdILdHDAvGrRm7GdbjWdpbWSMOa0csoQ8pUba9tLP8tq7M4Quks1xuMQAVnAxVfryiDXRzZ-KDnkPv8Sm4g_YFom1ltQHjQ6Q' }}
                                                        // resizeMode="cover"
                                                        // style={{ width: 200, height: 200 }} />
                                                      );
                                                    default:
                                                      return null;
                                                  }
                                                },
                                              );
                                            },
                                          )}
                                        </View>
                                      );
                                    default:
                                      return null;
                                  }
                                },
                              );
                            })}
                          </View>
                        );
                      default:
                        return null;
                    }
                  })}
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 50,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Brother 1816 Printed',
    letterSpacing: 1,
    color: '#3B3B3B',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#3B3B3B',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Brother 1816 Printed',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: '70%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bulletContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  bulletPoint: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Brother 1816 Printed',
    color: '#3B3B3B',
    lineHeight: 23,
  },
  highlightedText: {
    fontSize: 24,
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '500',
    color: '#899E33',
    marginVertical: 15,
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
  redLine: {
    height: 2,
    width: 50,
    backgroundColor: '#FC6060',
    marginVertical: 10,
  },
  simpleTextContent: {
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 10,
  },
  subHeading: {
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  errorWarning: {
    marginLeft: 10,
    maxWidth: '90%',
    fontFamily: 'Brother 1816 Printed',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#FC6060',
  },
});
