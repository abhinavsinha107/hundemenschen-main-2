import { Card } from '@/components/Card';
import { Collapsible } from '@/components/Collapsible';
import { HorizontalLine } from '@/components/HorizontalLine';
import { Adress } from '@/components/profile/Adress';
import { Edit } from '@/components/profile/Edit';
import { Element } from '@/components/profile/Element';
import { CheckElement } from '@/components/Unbekannt_Label';
import { Colors } from '@/constants/Colors';
import useContactStore from '@/stores/contactStore';
import useDogStore from '@/stores/dogStore';
import useGeneralInfoStore from '@/stores/generalInfoStore';
import useMedicalInfoStore from '@/stores/medicalInfoStore';
import useVetStore from '@/stores/vetStore';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from '@/components/Text';
import { Header } from '@/components/Header';
import { router } from 'expo-router';

export default function Index() {
  const dog = useDogStore((state) => state.dog);
  const contact = useContactStore((state) => state.primaryContact);
  const secondaryContact = useContactStore((state) => state.secondaryContact);
  const vets = useVetStore((state) => state.vets);
  const medical = useMedicalInfoStore((state) => state.medicalInfo);
  const general = useGeneralInfoStore((state) => state.generalInfo);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header title="Profildaten" subTitle="Gesamtüberblick."></Header>
        <Card>
          <View style={styles.entry_container}>
            <Text style={styles.title}>
              {dog?.call_name ? dog.call_name : ''}
            </Text>
            <Text style={styles.content}>
              {dog?.full_name ? dog.full_name : ''}
            </Text>
          </View>
          {dog?.birthday && (
            <Element
              title={dog.birthday ? dog.birthday.toDateString() : ''}
              content={[
                dog.estimated_birthday == null
                  ? ''
                  : dog.estimated_birthday
                    ? 'Geschätzt'
                    : 'Bekannt',
              ]}
              mode="checkEntry"
            ></Element>
          )}
          <Element
            title={dog?.breed || ''}
            content={[
              dog?.mixed_breed == null
                ? ''
                : dog.mixed_breed
                  ? 'Mischling'
                  : 'Reinrassig',
            ]}
            mode="checkEntry"
          ></Element>
          <Element
            title={
              dog?.gender ? (dog.gender === 'male' ? 'Rüde' : 'Hündin') : ''
            }
            content={[
              dog?.neutered == null
                ? ''
                : dog.neutered
                  ? 'Kastriert'
                  : 'nicht kastriert',
            ]}
            mode="checkEntry"
          ></Element>
        </Card>

        {dog?.chip_number ? (
          <Collapsible title="1. Identifikation">
            <Edit title="Kennummern" path="/forms/dogidform"></Edit>
            <Element
              title="Chipnummer"
              content={[dog.chip_number || '']}
              mode="entry"
            ></Element>
            <Element
              title="Chipdatum"
              content={[dog.chip_date ? dog.chip_date.toDateString() : '']}
              mode="entry"
            ></Element>
            <Element
              title="Stelle des Transponders"
              content={[dog.chip_location || '']}
              mode="entry"
            ></Element>
            <Element
              title="Heimtierausweisnummer"
              content={[dog.pet_passport_number || '']}
              mode="entry"
            ></Element>
            <Element
              title="Herkunftsland"
              content={[dog.origin_country || '']}
              mode="entry"
            ></Element>
            <HorizontalLine />
            <Element
              title="Tasso-Nummer"
              content={[dog.tasso_number || '']}
              mode="entry"
            ></Element>
            <Element
              title="Steuermarkennummer"
              content={[dog.tax_number || '']}
              mode="entry"
            ></Element>
            <Element
              title="Eigene Anmerkungen"
              content={[dog.identification_notes || '']}
              mode="notes"
            ></Element>
            <HorizontalLine />
            <Element
              title="Tierversicherung"
              content={[dog.insurance_name || '']}
              mode="entry"
            ></Element>
          </Collapsible>
        ) : (
          <Collapsible title="1. Identifikation">
            <Edit title="Kennummern" path="/forms/dogidform"></Edit>
            <Text>Es liegen noch keine Daten vor.</Text>
          </Collapsible>
        )}
        <Collapsible title="2. Kontaktdaten">
          <Edit title="Halter*in" path="/forms/contactdataform"></Edit>
          {contact ? (
            <>
              <Element
                title={contact.first_name + ' ' + contact.last_name}
                content={[
                  contact.gender === 'm'
                    ? 'männlich'
                    : contact.gender === 'w'
                      ? 'weiblich'
                      : 'divers',
                ]}
                mode="header"
              ></Element>
              <Adress
                content={[
                  contact.street || '',
                  contact.house_number || '',
                  contact.zip_code || '',
                  contact.city || '',
                  contact.country || '',
                  contact.address_additional_info || '',
                ]}
              ></Adress>
              <Element
                title="Telefon"
                content={[contact.mobile || '', contact.secondary_phone || '']}
                mode="entry"
              ></Element>
              <Element
                title="E-Mail-Adresse"
                content={[contact.email || '']}
                mode="entry"
              ></Element>
              <Element
                title="Weitere Kontaktmöglichkeiten"
                content={[contact.notes || '']}
                mode="notes"
              ></Element>
            </>
          ) : (
            <Text>Es liegen noch keine Daten vor.</Text>
          )}
          <Edit title="Zweitkontakt" path="/forms/zweitkontakt"></Edit>
          {secondaryContact ? (
            <>
              <Element
                title={
                  secondaryContact.first_name + ' ' + secondaryContact.last_name
                }
                content={[]}
                mode="header"
              ></Element>
              <Element
                title="Telefon"
                content={[
                  secondaryContact.mobile || '',
                  secondaryContact.secondary_phone || '',
                ]}
                mode="entry"
              ></Element>
              <Element
                title="E-Mail-Adresse"
                content={[secondaryContact.email || '']}
                mode="entry"
              ></Element>
              <Element
                title="Weitere Kontaktmöglichkeiten"
                content={[secondaryContact.notes || '']}
                mode="notes"
              ></Element>
            </>
          ) : (
            <Text>Es liegen noch keine Daten vor.</Text>
          )}
        </Collapsible>
        {vets.length != 0 ? (
          <Collapsible title="3. Behandelnde">
            {vets.map((vet, index) => (
              <View style={styles.entry_container} key={vet.practice_name}>
                <Edit
                  title={'Praxis ' + (index + 1)}
                  path="/forms/praxenform"
                ></Edit>
                {vet.origin_veterinary_practice && (
                  <Element
                    title=""
                    content={['Stammpraxis']}
                    mode="checkEntry"
                  ></Element>
                )}
                <Element
                  title={vet.practice_name}
                  content={[vet.vet_name]}
                  mode="header"
                ></Element>
                <Adress
                  content={[
                    vet.street || '',
                    vet.house_number || '',
                    vet.zip_code || '',
                    vet.city || '',
                    vet.address_additional_info || '',
                  ]}
                ></Adress>
                <Element
                  title="Telefon"
                  content={[vet.mobile || '']}
                  mode="entry"
                ></Element>
                <Element
                  title="E-Mail-Adresse"
                  content={[vet.email || '']}
                  mode="entry"
                ></Element>
                <Element
                  title="Eigene Anmerkungen"
                  content={[vet.notes || '']}
                  mode="notes"
                ></Element>
              </View>
            ))}
            <View style={styles.fab_container}>
              <Text>Weitere Behandelnde eintragen</Text>
              <Pressable
                style={styles.fab}
                onPress={() => router.push('/forms/praxenform')}
              >
                <Text style={styles.fabText}>+</Text>
              </Pressable>
            </View>
          </Collapsible>
        ) : (
          <Collapsible title="3. Behandelnde">
            <Edit title="Praxis" path="/forms/praxenform"></Edit>
            <Text>Es liegen noch keine Daten vor.</Text>
          </Collapsible>
        )}
        {medical ? (
          <Collapsible title="4. Medizinisches">
            <Edit title="Medizinisches" path="/forms/medizinischesform"></Edit>
            <Element
              title="Bekannte Unverträglichkeiten (Futtermittel)"
              content={[medical.food_intolerances || '']}
              mode="entry"
            ></Element>
            <Element
              title="Bekannte Unverträglichkeiten (Medikamente)"
              content={[medical.medication_intolerances || '']}
              mode="entry"
            ></Element>
            <Element
              title="Gegenanzeigen"
              content={[medical.contraindications || '']}
              mode="entry"
            ></Element>
            <HorizontalLine />
            <Element
              title="Blutgruppe"
              content={[medical.blood_type || '']}
              mode="checkEntry"
            ></Element>
            <Element
              title="Blutgtransfusion erhalten"
              content={[medical.blood_transfusion_received ? 'ja' : 'nein']}
              mode="checkEntry"
            ></Element>
            <HorizontalLine />
            <Element
              title="Körperteile die Schwierigkeiten machen"
              content={[medical.problematic_body_parts || '']}
              mode="entry"
            ></Element>
            <Element
              title="Chronische Krankheit(en)"
              content={[medical.chronic_illness ? 'ja' : 'nein']}
              mode="checkEntry"
            ></Element>
            <Element
              title="Vorgeschichte/Verletzungen/Unfälle/Brüche"
              content={[medical.medical_history || '']}
              mode="entry"
            ></Element>
            <HorizontalLine />
            <Element
              title="Bereits bereiste Länder mit Jahr"
              content={[medical.countries_visited || '']}
              mode="entry"
            ></Element>
            <Element
              title="Mittelmeerkrankheit(en)"
              content={[medical.mediterranean_disease ? 'ja' : 'nein']}
              mode="checkEntry"
            ></Element>
            <Element
              title="Wenn ja, welche Befunde gab es?"
              content={[medical.mediterranean_disease_findings || '']}
              mode="entry"
            ></Element>
            <Element
              title="Eigene Anmerkungen"
              content={[medical.notes || '']}
              mode="notes"
            ></Element>
            {general?.caution_with_aggression && (
              <CheckElement
                color={Colors.light.attentionRed}
                text={'Vorsicht geboten! \nDer Hund reagiert u.u. aggressiv.'}
              ></CheckElement>
            )}
          </Collapsible>
        ) : (
          <Collapsible title="4. Medizinisches">
            <Edit title="Medizinisches" path="/forms/medizinischesform"></Edit>
            <Text>Es liegen noch keine Daten vor.</Text>
          </Collapsible>
        )}
        {general ? (
          <Collapsible title="5. Allgemeines">
            <Edit title="Alltag" path="/forms/allgemeinform"></Edit>
            <Element
              title="Allgemeine Angaben zu Verhalten und Charakter"
              content={[general.behavior_character || '']}
              mode="entry"
            ></Element>
            {general.caution_with_aggression && (
              <CheckElement
                color={Colors.light.attentionRed}
                text={'Vorsicht geboten!\nDer Hund reagiert u.u. aggressiv.'}
              ></CheckElement>
            )}
            <Element
              title="Haltung"
              content={[general.living_environment || '']}
              mode="checkEntry"
            ></Element>
            <Element
              title="Eigene Anmerkungen"
              content={[general.everyday_life_notes || '']}
              mode="notes"
            ></Element>
            <HorizontalLine />
            <Element
              title="Futtersorte"
              content={[general.feed_ingredients || '']}
              mode="entry"
            ></Element>
            <Element
              title="Futterhersteller"
              content={[general.feed_manufacturer || '']}
              mode="entry"
            ></Element>
            <Element
              title="Futtermenge"
              content={[general.feed_quantity || '']}
              mode="entry"
            ></Element>
            <Element
              title="Art des Futters"
              content={[general.feed_type || '']}
              mode="checkEntry"
            ></Element>
            <Element
              title="Eigene Anmerkungen"
              content={[general.feed_notes || '']}
              mode="notes"
            ></Element>
          </Collapsible>
        ) : (
          <Collapsible title="5. Allgemeines">
            <Edit title="Alltag" path="/forms/allgemeinform"></Edit>
            <Text>Es liegen noch keine Daten vor.</Text>
          </Collapsible>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  mainText: {
    color: Colors.light.lightGreen,
    fontFamily: 'Arkipelago',
    fontSize: 50,
    fontWeight: '400',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 30,
  },
  content: {
    fontSize: 12,
  },
  entry_container: {
    marginVertical: 8,
  },
  edit_title: {
    fontSize: 24,
    color: Colors.light.mediumGreen,
  },
  fab_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  fab: {
    //position: 'absolute',
    //bottom: 16,
    //right: 16,
    backgroundColor: Colors.light.darkGray,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: Colors.light.white,
    fontWeight: 'bold',
  },
});
