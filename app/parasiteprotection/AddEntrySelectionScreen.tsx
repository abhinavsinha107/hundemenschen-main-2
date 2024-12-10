import { Colors } from '@/constants/Colors';
import useGeneralInfoStore from '@/stores/generalInfoStore';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { Header } from '@/components/Header';
import FormWrapper from '../forms/formWrapper';

const AllEntriesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Alle");

  const tabs = ["Alle", "Wurmkur", "Zeckenschutz"];
  const entries: any[] = []; // Replace with actual data if necessary
  const saveIsDisabled = false; // Replace with the logic to enable/disable the button

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = () => {
    console.log("Save button clicked");
    // Add your save functionality here
  };

  return (
      <View style={styles.container}>
        {/* Header */}
        <Header title= "" subTitle="Was möchtest du in die"/>
        <Header title = "Gesundheitsakte" subTitle="von Hundename eintragen" />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        
        <View style={styles.contentContainer}>
          {entries.length === 0 ? (
            <Text style={styles.noEntriesText}>
              Noch keine Einträge vorhanden.
            </Text>
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>{item}</Text> // Customize how each entry is displayed
              )}
            />
          )}
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('./AddEntrySelectionScreen')}
        >
          
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 30,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabText: {
    color: "#000",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEntriesText: {
    fontSize: 16,
    color: "#aaa",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
  },
});

export default AllEntriesScreen;
