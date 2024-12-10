import useDogStore from '@/stores/dogStore';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Button from '../Button';
import useContactStore from '@/stores/contactStore';
import useGeneralInfoStore from '@/stores/generalInfoStore';
import useMedicalInfoStore from '@/stores/medicalInfoStore';
import useVetStore from '@/stores/vetStore';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useImageDataContext } from '@/hooks/ImageDataContext';

export default function DogInfo() {
  const { dog, createNewDog, deleteDog } = useDogStore();
  const {
    primaryContact,
    createPrimaryContact,
    deletePrimaryContact,
    secondaryContact,
    createSecondaryContact,
    deleteSecondaryContact,
  } = useContactStore();
  const { generalInfo, createNewGeneralInfo, deleteGeneralInfo } =
    useGeneralInfoStore();
  const { medicalInfo, createNewMedicalInfo, deleteMedicalInfo } =
    useMedicalInfoStore();
  const { vets, createNewVet, deleteAllVets } = useVetStore();
  const { imageData } = useImageDataContext();

  const createDogData = async () => {
    await createNewDog({
      full_name: 'Bello der Erste',
      call_name: 'Bello',
      gender: 'Rüde',
      neutered: true,
      birthday: new Date('2015-05-10'),
      estimated_birthday: true,
      breed: 'Labrador',
      mixed_breed: true,
      breed_unknown: false,
      origin_country: 'Deutschland',
      chip_number: 'DE123456789012',
      chip_date: new Date('2015-05-10'),
      chip_location: 'Hals',
      pet_passport_number: 'DE987654321',
      tasso_number: 'T123456789',
      tax_number: 'TX123456789',
      identification_notes: 'Keine besonderen Merkmale',
      has_pet_insurance: true,
      insurance_name: 'TierCare',
      image: imageData ?? null,
    });
  };

  const createPrimaryContactData = async () => {
    await createPrimaryContact({
      first_name: 'Max',
      last_name: 'Mustermann',
      gender: 'männlich',
      additional_info: 'Hundebesitzer',
      zip_code: '12345',
      city: 'Berlin',
      street: 'Musterstraße 12',
      house_number: '12',
      address_additional_info: '',
      country: 'Deutschland',
      mobile: '1234567890',
      secondary_phone: '0987654321',
      email: 'max@example.com',
      notes: 'Kontakt für Bello',
    });
  };

  const createSecondaryContactData = async () => {
    await createSecondaryContact({
      first_name: 'Zweitname',
      last_name: 'Zweitnachname',
      gender: 'd',
      mobile: '011221833559',
      secondary_phone: '015221833559',
      notes: 'Zweitnotiz',
    });
  };

  const createGeneralInfoData = async () => {
    await createNewGeneralInfo({
      caution_with_aggression: true,
      behavior_character: 'Freundlich, verspielt.',
      living_environment: 'drinnen',
      everyday_life_notes: 'Mag Spaziergänge und Ballspielen.',
      feed_ingredients: 'Huhn, Reis.',
      feed_manufacturer: 'PetFoodCo',
      feed_quantity: '300g/Tag',
      feed_type: 'Trockenfutter',
      feed_notes: 'Keine Allergien.',
    });
  };

  const createMedicalInfoData = async () => {
    await createNewMedicalInfo({
      food_intolerances: 'Keine.',
      medication_intolerances: 'Penicillin.',
      contraindications: 'Keine.',
      blood_type: 'DEA1.1 positiv',
      blood_transfusion_received: true,
      problematic_body_parts: 'Hüften.',
      chronic_illness: true,
      medical_history: 'Verletzung nach Autounfall.',
      countries_visited: 'Deutschland, Österreich.',
      mediterranean_disease: true,
      mediterranean_disease_findings: 'Keuchhusten',
      caution_with_aggression: true,
      notes: 'Empfindlich bei Kälte.',
    });
  };

  const createVetData = async () => {
    await createNewVet({
      practice_name: 'Tierklinik Berlin',
      vet_name: 'Dr. Anna Schmidt',
      origin_veterinary_practice: true,
      zip_code: '12345',
      city: 'Berlin',
      street: 'Tierstraße 5',
      house_number: '5',
      address_additional_info: '',
      mobile: '123456789',
      secondary_phone: '098765432',
      email: 'vet@example.com',
      notes: 'Spezialisiert auf Hundekrankheiten.',
    });

    await createNewVet({
      practice_name: 'Kleine Tiersprechstunde',
      vet_name: 'Dr. Max Mustermann',
      origin_veterinary_practice: true,
      zip_code: '54321',
      city: 'Hamburg',
      street: 'Hundewiesenweg 10',
      house_number: '3',
      address_additional_info: 'Neben dem Tierpark',
      mobile: '987654321',
      secondary_phone: '0123456789',
      email: 'max.mustermann@vet.com',
      notes: 'Expertin für Agenkrankheiten.',
    });

    await createNewVet({
      practice_name: 'Veterinärpraxis München',
      vet_name: 'Dr. Klaus Bauer',
      origin_veterinary_practice: false,
      zip_code: '67890',
      city: 'München',
      street: 'Alpenstraße 15',
      house_number: '7',
      address_additional_info: 'Am Waldrand',
      mobile: '112233445',
      secondary_phone: '556677889',
      email: 'klaus.bauer@vetmuenchen.de',
      notes: 'Spezialisiert auf Chirurgie bei Tieren.',
    });
  };

  const handleCreateAllData = async () => {
    await createDogData();
    await createPrimaryContactData();
    await createSecondaryContactData();
    await createGeneralInfoData();
    await createMedicalInfoData();
    await createVetData();
    console.log('All data created successfully');
  };

  if (!dog) {
    return <Button title="Alles hinzufügen" onPress={handleCreateAllData} />;
  }

  const handleDeleteAll = async () => {
    await deleteDog();
    await deletePrimaryContact();
    await deleteSecondaryContact();
    await deleteGeneralInfo();
    await deleteMedicalInfo();
    await deleteAllVets();
    console.log('All data deleted');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: 50,
        }}
      >
        <View style={styles.contentContainer}>
          <Text
            style={styles.sectionTitle}
            onPress={() => router.navigate('../../forms/schnellprofil')}
          >
            HUND
          </Text>
          <View>
            {dog && (
              <>
                <Text>Full Name: {dog.full_name || ''}</Text>
                <Text>Call Name: {dog.call_name || ''}</Text>
                <Text>Gender: {dog.gender || ''}</Text>
                <Text>
                  Birthday:{' '}
                  {dog.birthday
                    ? new Date(dog.birthday).toLocaleDateString()
                    : ''}
                </Text>
                <Text>
                  Estimated Birthday: {dog.estimated_birthday ? 'Yes' : 'No'}
                </Text>
                <Text>
                  Birthday Unknown: {dog.birthday_unknown ? 'Yes' : 'No'}
                </Text>
                <Text>Neutered: {dog.neutered ? 'Yes' : 'No'}</Text>
                <Text>Breeding Dog: {dog.breeding_dog ? 'Yes' : 'No'}</Text>
                <Text>Breed: {dog.breed || ''}</Text>
                <Text>Mixed Breed: {dog.mixed_breed ? 'Yes' : 'No'}</Text>
                <Text>Breed Unknown: {dog.breed_unknown ? 'Yes' : 'No'}</Text>
                <Text>Image: {dog.image || ''}</Text>

                <Text>Chip Number: {dog.chip_number || ''}</Text>
                <Text>
                  Chip Date:{' '}
                  {dog.chip_date
                    ? new Date(dog.chip_date).toLocaleDateString()
                    : ''}
                </Text>
                <Text>Chip Location: {dog.chip_location || ''}</Text>
                <Text>
                  Pet Passport Number: {dog.pet_passport_number || ''}
                </Text>
                <Text>Origin Country: {dog.origin_country || ''}</Text>
                <Text>Tasso Number: {dog.tasso_number || ''}</Text>
                <Text>Tax Number: {dog.tax_number || ''}</Text>
                <Text>
                  Identification Notes: {dog.identification_notes || ''}
                </Text>
                <Text>
                  Has Pet Insurance: {dog.has_pet_insurance ? 'Yes' : 'No'}
                </Text>
                <Text>Insurance Name: {dog.insurance_name || ''}</Text>
                <Text>Owner Contact ID: {dog.owner_contact_id || ''}</Text>
                <Text>
                  Secondary Contact ID: {dog.secondary_contact_id || ''}
                </Text>
              </>
            )}
          </View>
          <Text
            style={styles.sectionTitle}
            onPress={() => router.navigate('../../forms/contactdataform')}
          >
            ERSTKONTAKT
          </Text>
          <View>
            {primaryContact && (
              <>
                <Text>First Name: {primaryContact.first_name || ''}</Text>
                <Text>Last Name: {primaryContact.last_name || ''}</Text>
                <Text>Gender: {primaryContact.gender || ''}</Text>
                <Text>
                  Additional Info: {primaryContact.additional_info || ''}
                </Text>
                <Text>Zip Code: {primaryContact.zip_code || ''}</Text>
                <Text>City: {primaryContact.city || ''}</Text>
                <Text>Street: {primaryContact.street || ''}</Text>
                <Text>House Number: {primaryContact.house_number || ''}</Text>
                <Text>
                  Address Additional Info:{' '}
                  {primaryContact.address_additional_info || ''}
                </Text>
                <Text>Country: {primaryContact.country || ''}</Text>
                <Text>Mobile: {primaryContact.mobile || ''}</Text>
                <Text>
                  Secondary Phone: {primaryContact.secondary_phone || ''}
                </Text>
                <Text>Email: {primaryContact.email || ''}</Text>
                <Text>Notes: {primaryContact.notes || ''}</Text>
              </>
            )}
          </View>
          <Text
            style={styles.sectionTitle}
            onPress={() => router.navigate('../../forms/zweitkontakt')}
          >
            ZWEITKONTAKT
          </Text>
          <View>
            {secondaryContact && (
              <>
                <Text>First Name: {secondaryContact.first_name || ''}</Text>
                <Text>Last Name: {secondaryContact.last_name || ''}</Text>
                <Text>Gender: {secondaryContact.gender || ''}</Text>
                <Text>Mobile: {secondaryContact.mobile || ''}</Text>
                <Text>
                  Secondary Phone: {secondaryContact.secondary_phone || ''}
                </Text>
                <Text>Notes: {secondaryContact.notes || ''}</Text>
              </>
            )}
          </View>
          <View>
            {vets.length > 0 ? (
              <>
                {vets.map((vet, index) => (
                  <View key={index}>
                    <Text
                      style={styles.sectionTitle}
                      onPress={() => router.navigate('../../forms/praxenform')}
                    >
                      TIERARZT {index + 1}
                    </Text>
                    <Text>Practice Name: {vet.practice_name || ''}</Text>
                    <Text>Vet Name: {vet.vet_name || ''}</Text>
                    <Text>
                      Origin Veterinary Practice:{' '}
                      {vet.origin_veterinary_practice ? 'Yes' : 'No'}
                    </Text>
                    <Text>ZIP Code: {vet.zip_code || ''}</Text>
                    <Text>City: {vet.city || ''}</Text>
                    <Text>Street: {vet.street || ''}</Text>
                    <Text>House Number: {vet.house_number || ''}</Text>
                    <Text>
                      Address Additional Info:{' '}
                      {vet.address_additional_info || ''}
                    </Text>
                    <Text>Mobile: {vet.mobile || ''}</Text>
                    <Text>Secondary Phone: {vet.secondary_phone || ''}</Text>
                    <Text>Email: {vet.email || ''}</Text>
                    <Text>Notes: {vet.notes || ''}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    { marginTop: 20, marginBottom: 30 },
                  ]}
                  onPress={deleteAllVets}
                >
                  <Text style={styles.nextButtonText}>TIERÄRZTE LÖSCHEN</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={styles.sectionTitle}
                  onPress={() => router.navigate('../../forms/praxenform')}
                >
                  TIERARZT
                </Text>
              </>
            )}
          </View>
          <Text
            style={styles.sectionTitle}
            onPress={() => router.navigate('../../forms/medizinischesform')}
          >
            MEDIZINISCHE INFORMATIONEN
          </Text>
          <View>
            {medicalInfo && (
              <>
                <Text>
                  Food Intolerances: {medicalInfo.food_intolerances || ''}
                </Text>
                <Text>
                  Medication Intolerances:{' '}
                  {medicalInfo.medication_intolerances || ''}
                </Text>
                <Text>
                  Contraindications: {medicalInfo.contraindications || ''}
                </Text>
                <Text>Blood Type: {medicalInfo.blood_type || ''}</Text>
                <Text>
                  Blood Transfusion Received:{' '}
                  {medicalInfo.blood_transfusion_received ? 'Yes' : 'No'}
                </Text>
                <Text>
                  Problematic Body Parts:{' '}
                  {medicalInfo.problematic_body_parts || ''}
                </Text>
                <Text>
                  Chronic Illness: {medicalInfo.chronic_illness ? 'Yes' : 'No'}
                </Text>
                <Text>
                  Medical History: {medicalInfo.medical_history || ''}
                </Text>
                <Text>
                  Countries Visited: {medicalInfo.countries_visited || ''}
                </Text>
                <Text>
                  Mediterranean Disease:{' '}
                  {medicalInfo.mediterranean_disease ? 'Yes' : 'No'}
                </Text>
                <Text>
                  Mediterranean Disease Findings:{' '}
                  {medicalInfo.mediterranean_disease_findings || ''}
                </Text>
                <Text>
                  Caution with Aggression:{' '}
                  {medicalInfo.caution_with_aggression ? 'Yes' : 'No'}
                </Text>
                <Text>Notes: {medicalInfo.notes || ''}</Text>
              </>
            )}
          </View>

          <Text
            style={styles.sectionTitle}
            onPress={() => router.navigate('../../forms/allgemeinform')}
          >
            ALLGEMEINE INFORMATIONEN
          </Text>
          <View>
            {generalInfo && (
              <>
                <Text>
                  Caution with Aggression:{' '}
                  {generalInfo.caution_with_aggression ? 'Yes' : 'No'}
                </Text>
                <Text>
                  Behavior Character: {generalInfo.behavior_character || ''}
                </Text>
                <Text>
                  Living Environment: {generalInfo.living_environment || ''}
                </Text>
                <Text>
                  Everyday Life Notes: {generalInfo.everyday_life_notes || ''}
                </Text>
                <Text>
                  Feed Ingredients: {generalInfo.feed_ingredients || ''}
                </Text>
                <Text>
                  Feed Manufacturer: {generalInfo.feed_manufacturer || ''}
                </Text>
                <Text>Feed Quantity: {generalInfo.feed_quantity || ''}</Text>
                <Text>Feed Type: {generalInfo.feed_type || ''}</Text>
                <Text>Feed Notes: {generalInfo.feed_notes || ''}</Text>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleDeleteAll}>
            <Text style={styles.nextButtonText}>ALLES LÖSCHEN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '70%',
    marginHorizontal: '15%',
    paddingTop: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '600',
    color: 'blue',
  },
  nextButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 80,
    alignSelf: 'flex-start',
  },
  nextButtonText: {
    fontSize: 14,
    color: Colors.light.white,
  },
});
