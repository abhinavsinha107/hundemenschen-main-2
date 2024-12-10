import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Header } from '@/components/Header';

const ParasitenschutzScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Alle");
  const [expandedItem, setExpandedItem] = useState<number | null>(null); // Track which item is expanded

  const tabs = ["Alle", "Wurmkur/-test", "Zeckenschutz"];
  const data = [
    { id: 1, title: "Ohne Befund", date: "TT.MM.JJ", type: "Wurmtest", expandedContent: "Details: Ohne Befund - Keine Parasiten gefunden." },
    { id: 2, title: "Simparica", date: "TT.MM.JJ", type: "Zeckenschutz", expandedContent: "Details: Simparica - Schützt vor Zecken und Flöhen." },
    { id: 3, title: "Milpro", date: "TT.MM.JJ", type: "Wurmkur", expandedContent: "Details: Milpro - Verwendet für regelmäßige Entwurmung." },
    { id: 4, title: "Befund", date: "TT.MM.JJ", type: "Wurmtest", expandedContent: "Details: Befund - Bandwürmer gefunden, Behandlung erforderlich." },
    { id: 5, title: "Bravecto", date: "TT.MM.JJ", type: "Zeckenschutz", expandedContent: "Details: Bravecto - 3 Monate Schutz vor Zecken." },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem((prev) => (prev === id ? null : id)); // Toggle expanded state
  };

  return (
    <View style={styles.container}>
      <Header title="Parasitenschutz" subTitle="aktuell halten" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List Items */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpandItem(item.id)}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>
                <Text style={styles.itemType}>{item.type}</Text>
              </View>
            </TouchableOpacity>
            {expandedItem === item.id && (
              <View style={styles.expandedContent}>
                <Text>{item.expandedContent}</Text>
              </View>
            )}
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log("Add new entry")}>
        <Text style={styles.fabText}>+</Text>
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
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#4CAF50",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: "#333",
      marginBottom: 16,
    },
    tabContainer: {
      flexDirection: "row",
      marginBottom: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: "white",
      marginRight: 8,
      borderWidth: 1, // Added border width for the tab
      borderColor: "#899E33", // Corrected to valid color with '#'
    },
    activeTab: {
      backgroundColor: "#000",
      borderColor: "#899E33", // Ensure active tab also has this border color
    },
    tabText: {
      color: "#000",
      fontSize: 14,
    },
    activeTabText: {
      color: "#fff",
    },
    itemContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      marginBottom: 16,
      overflow: "hidden",
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    itemDate: {
      fontSize: 12,
      color: "#999",
    },
    itemType: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#4CAF50",
    },
    expandedContent: {
      padding: 16,
      backgroundColor: "#fff",
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
      fontSize: 24,
      color: "#fff",
    },
  });
  
  export default ParasitenschutzScreen;
  