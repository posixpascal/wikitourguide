import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { RootStackScreenProps } from '../types';
import { Text } from '../components/Themed';
import { PortalMapSelector } from '../components/PortalMapSelector';

export default function PortalScreen({
  navigation,
}: RootStackScreenProps<'Portal'>) {
  return (
    <ScrollView>
      <Text style={styles.main}>
        Verschieben Sie einfach die Karte um Ihren Standort innerhalb des Wiki
        Tour Guides zu ändern. (Preview Funktion)
      </Text>

      <PortalMapSelector />

      <Text
        style={{
          opacity: 0.5,
          fontSize: 24,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        Standort setzen
      </Text>
      <Text
        style={{
          opacity: 0.5,
          fontSize: 24,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        Portal deaktivieren
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
});
