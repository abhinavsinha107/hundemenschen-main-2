import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Header } from '@/components/Header';
import Text from '@/components/Text';
import { router } from 'expo-router';

const AllEntriesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Alle");

  const tabs = ["Wurmtest", "Wurmkur", "Zeckenschutz"];
  const entries: any[] = []; // Replace with actual data if necessary

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Wurmkur") {
      router.push("./WormTreatment");
    } else if (tab === "Wurmtest") {
      router.push("./WormTest");
    } else if (tab === "Zeckenschutz") {
      router.push("./TickProtection");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Parasitenschutz" subTitle="aktuell halten" />

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

      {/* Content */}
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
});

export default AllEntriesScreen;
