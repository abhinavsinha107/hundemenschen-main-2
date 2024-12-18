import { ImageDataProvider } from '@/hooks/ImageDataContext';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { DogProfileHeader } from '@/components/DogProfileHeader';
import useDogStore from '@/stores/dogStore';

export default function RootLayout() {
  const getShowHeaderObject = function (
    emptyHeader: boolean,
    subTitle?: string,
    title?: string,
  ) {
    return {
      headerShown: true,
      header: () => (
        <DogProfileHeader
          subTitle={subTitle}
          title={title}
          emptyHeader={emptyHeader}
        />
      ),
    };
  };

  const { dog } = useDogStore();

  const addDogString = 'HUND HINZUFÜGEN';

  return (
    <ImageDataProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      >
        <Stack.Screen name="index" options={getShowHeaderObject(true)} />
        <Stack.Screen
          name="profile/index"
          options={getShowHeaderObject(false, 'DATENÜBERSICHT', 'Hundename')}
        />
        <Stack.Screen
          name="healthRecordDialog/InstructionScreen"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="healthRecordDialog/AddPictureScreen"
          options={getShowHeaderObject(false, addDogString, 'Profilbild')}
        />
        <Stack.Screen
          name="healthRecordDialog/DecisionScreen"
          options={getShowHeaderObject(false, addDogString, 'Gesamtprofil')}
        />
        <Stack.Screen
          name="info/index"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen/ löschen',
            'Testumgebung',
          )}
        />
        <Stack.Screen
          name="startup/index"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="forms/schnellprofil"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Schnellprofil',
          )}
        />
        <Stack.Screen
          name="forms/praxenform"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Kontaktdaten',
          )}
        />
        <Stack.Screen
          name="forms/allgemeinform"
          options={getShowHeaderObject(false, 'Hund hinzufügen', 'Allgemeines')}
        />
        <Stack.Screen
          name="forms/dogidform"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Identifikation',
          )}
        />
        <Stack.Screen
          name="forms/contactdataform"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Kontaktdaten',
          )}
        />
        <Stack.Screen
          name="forms/zweitkontakt"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Kontaktdaten',
          )}
        />
        <Stack.Screen
          name="forms/medizinischesform"
          options={getShowHeaderObject(
            false,
            'Hund hinzufügen',
            'Medizinisches',
          )}
        />
        <Stack.Screen
          name="healthRecordDialog/CompletedScreen"
          options={getShowHeaderObject(false, 'Hund hinzufügen', 'Allgemeines')}
        />
        <Stack.Screen name="adddog/index" options={getShowHeaderObject(true)} />

        <Stack.Screen
          name="health/index"
          options={getShowHeaderObject(false, 'Übersicht', dog?.call_name)}
        />
        <Stack.Screen
          name="health/weight/index"
          options={getShowHeaderObject(false, 'Gewicht', dog?.call_name)}
        />
        <Stack.Screen
          name="health/weight/create/index"
          options={getShowHeaderObject(false, 'Neuer Eintrag', dog?.call_name)}
        />
        <Stack.Screen
          name="health/checkup/create/index"
          options={getShowHeaderObject(false, 'Neuer Eintrag', dog?.call_name)}
        />
        <Stack.Screen
          name="health/checkup/index"
          options={getShowHeaderObject(
            false,
            'Check Up Ergebnisse',
            dog?.call_name,
          )}
        />
        <Stack.Screen
          name="health/checkup/[id]/index"
          options={getShowHeaderObject(
            false,
            'Vitality Check Up',
            dog?.call_name,
          )}
        />
        <Stack.Screen
          name="parasiteprotection/allEntriesScreen"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="parasiteprotection/WormTreatment"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="parasiteprotection/TickProtection"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="parasiteprotection/WormTest"
          options={getShowHeaderObject(true)}
        />
        <Stack.Screen
          name="health/heat/index"
          options={getShowHeaderObject(false, 'Läufigkeit', dog?.call_name)}
        />
        <Stack.Screen
          name="health/heat/HeatForm"
          options={getShowHeaderObject(false, 'Läufigkeit', dog?.call_name)}
        />
        <Stack.Screen
          name="health/heat/HeatPhaseForm"
          options={getShowHeaderObject(false, 'Läufigkeit', dog?.call_name)}
        />
        <Stack.Screen
          name="health/heat/AddEntrySelectionScreen"
          options={getShowHeaderObject(false, 'Läufigkeit', dog?.call_name)}
        />
        <Stack.Screen
          name="medicalInfos/index"
          options={getShowHeaderObject(false, 'NOTFALLWISSEN', 'Hauptthemen')}
        />
        <Stack.Screen
          name="medicalInfos/akuteSituationen"
          options={getShowHeaderObject(
            false,
            'NOTFALLWISSEN',
            'Unterkategorie',
          )}
        />
        <Stack.Screen
          name="medicalInfos/vergiftung&Giftiges"
          options={getShowHeaderObject(
            false,
            'NOTFALLWISSEN',
            'Unterkategorie',
          )}
        />
        <Stack.Screen
          name="medicalInfos/symptomeErkennen"
          options={getShowHeaderObject(
            false,
            'NOTFALLWISSEN',
            'Unterkategorie',
          )}
        />
        <Stack.Screen
          name="medicalInfos/konkreteMassnahmem"
          options={getShowHeaderObject(
            false,
            'NOTFALLWISSEN',
            'Unterkategorie',
          )}
        />
        <Stack.Screen
          name="medicalInfos/vitalwerteUberprufen"
          options={getShowHeaderObject(
            false,
            'NOTFALLWISSEN',
            'Unterkategorie',
          )}
        />
        <Stack.Screen
          name="medicalInfos/dynamicPage"
          options={getShowHeaderObject(false, 'NOTFALLWISSEN', 'Einzelseite')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen1"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen2"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen3"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen4"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen5"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen6"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen7"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen8"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen9"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen10"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen11"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
        <Stack.Screen
          name="medicalInfos/blackScreens/blackScreen12"
          options={getShowHeaderObject(false, 'CHCEK UP', 'Hundename')}
        />
      </Stack>
    </ImageDataProvider>
  );
}
