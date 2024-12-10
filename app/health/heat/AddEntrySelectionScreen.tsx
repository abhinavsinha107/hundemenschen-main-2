import Text from '@/components/Text';
import useDogStore from '@/stores/dogStore';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useLatestHeat } from '@/stores/heatStore';

export default function AddEntrySelectionScreen() {
  const router = useRouter();
  const dog = useDogStore((state) => state.dog);
  const { all: heat } = useLatestHeat();
  const [activeTab, setActiveTab] = useState('Alle');

  const tabs = ['Läufigkeit', 'Phase der Läufigkeit'];
  const entries: any[] = []; // Replace with actual data if necessary

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Läufigkeit') {
      router.push('./HeatForm');
    } else if (tab === 'Phase der Läufigkeit') {
      router.push('./HeatPhaseForm');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Was möchtest du in die</Text>
        <Text style={styles.title}>Gesundheitsakte</Text>
        <Text style={styles.subTitle}>von {dog?.call_name} eintragen?</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          key="Läufigkeit"
          style={[styles.tab, activeTab === 'Läufigkeit' && styles.activeTab]}
          onPress={() => handleTabPress('Läufigkeit')}
        >
          <Text style={[activeTab === 'Läufigkeit' && styles.activeTabText]}>
            Läufigkeit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="Phase der Läufigkeit"
          style={[
            styles.tab,
            activeTab === 'Phase der Läufigkeit' && styles.activeTab,
          ]}
          onPress={() => handleTabPress('Phase der Läufigkeit')}
          disabled={heat.length == 0}
        >
          <Text
            style={[
              activeTab === 'Phase der Läufigkeit' && styles.activeTabText,
            ]}
          >
            Phase der Läufigkeit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: '100%',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    color: Colors.light.lightGreen,
    fontFamily: 'Arkipelago',
    fontSize: 50,
    fontWeight: '400',
  },
  subTitle: {
    color: Colors.light.darkGray,
    fontSize: 30,
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.mediumGreen,
  },
  activeTab: {
    backgroundColor: Colors.light.darkGray,
    borderWidth: 0,
  },
  activeTabText: {
    color: Colors.light.white,
  },
});
