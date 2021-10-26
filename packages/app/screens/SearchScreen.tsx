import * as React from 'react';
import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { RootStackScreenProps } from '../types';
import { Text } from '../components/Themed';
import { BlurView } from 'expo-blur';

export default function SearchScreen({
  navigation,
}: RootStackScreenProps<'Search'>) {
  const scheme = useColorScheme();
  return (
    <BlurView intensity={100} tint={scheme} style={{ height: '100%' }}>
      <ScrollView style={styles.container}>
        <Text>Suche</Text>
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    paddingHorizontal: 20,
  },
});
