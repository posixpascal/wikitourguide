import * as React from 'react';
import {Platform, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { RootStackScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { BlurView } from 'expo-blur';
import { VoicePicker } from '../components/VoicePicker';
import { ColorPicker } from '../components/ColorPicker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useAppSelector } from '../hooks/useAppSelector';
import { setColor, setPitch, setRate, setDuration } from '../features/settings/settings.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Slider from "@react-native-community/slider";
import {useState} from "react";

export default function SettingsScreen({
  navigation,
}: RootStackScreenProps<'Settings'>) {

  const scheme = useColorScheme();
  const settings = useAppSelector((state) => state.settings)
  const colors = useAppSelector((state) => state.settings.colors);
  const duration = useAppSelector((state) => state.settings.duration);
  const dispatch = useAppDispatch();

  const set = () => {};

  // .findIndex
  const valueList = ['extrashort', 'short', 'medium', 'long'];
  const values = {
    extrashort: 0,
    short: 1,
    medium: 2,
    long: 3,
  };

  const change = async (index) => {
    dispatch(setDuration(valueList[index]));
    await AsyncStorage.setItem('duration', valueList[index]);
  };

  const changePitch = async (value: any) => {
    dispatch(setPitch(value));
    await AsyncStorage.setItem('pitch', "" + value);
  };

  const changeRate = async (value: any) => {
    dispatch(setRate(value));
    await AsyncStorage.setItem('rate', "" + value);
  };

  console.log(settings);

  return (
    <BlurView
      intensity={100}
      tint={scheme}
      style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        paddingBottom: 40,
        paddingTop: Platform.select({
          default: 120,
          android: 90
        }),
      }}
    >
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.settingsHeadline}>Sprecher</Text>
        <Text>
          Lege deinen Finger auf einen Sprecher damit er sich vorstellt!
        </Text>
        <VoicePicker />
        <View style={styles.spacer} />
        {/*<Text style={styles.settingsHeadline}>
                    Sprache
                </Text>
                <LanguagePicker/>
                                <View style={styles.spacer}/>
*/}
        <Text style={styles.settingsHeadline}>Länge der Artikel</Text>
        <Text>
          Extra Kurz (1 Sektion), Kurz (2 Sektionen), Mittel (4 Sektionen), Lang
          (Alle Sektionen)
        </Text>
        <SegmentedControl
          style={{ marginTop: 20 }}
          values={['Extra Kurz', 'Kurz', 'Mittel', 'Lang']}
          selectedIndex={values[duration]}
          onChange={(event) => {
            change(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <View style={styles.spacer} />
        <Text style={styles.settingsHeadline}>Lesegeschwindigkeit</Text>
        <Text>
          Beinflusst die Lesegeschwindigkeit des Sprechers. Hier kannst du zwischen doppelt- und halb-so-schnell entscheiden.
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <Slider
            onValueChange={(e) => changeRate(e)}
            value={settings.rate}
            style={{width: '100%', height: 40}}
            minimumValue={0.5}
            maximumValue={2}
            step={0.5}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#000000"
            thumbTintColor={colors.primary2}
        /><Text style={{ width: 80}}>{settings.rate}X</Text></View>
        <View style={styles.spacer} />
        <Text style={styles.settingsHeadline}>Pitch</Text>
        <Text>
          Beinflusse die Tonhöhe des Sprechers, ein hoher Wert steht für eine hohe Stimme wohingegen ein kleiner Wert eine tiefere Stimme erzeugt.
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <Slider
            onValueChange={(e) => changePitch(e)}
            value={settings.pitch}
            style={{width: "100%", height: 40}}
            minimumValue={-3}
            maximumValue={3}
            step={0.25}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#000000"
            thumbTintColor={colors.primary2}
        />
          <Text style={{ width: 80}}>{settings.pitch}</Text>
        </View>

        <View style={styles.spacer} />
        <Text style={styles.settingsHeadline}>Farbschema</Text>
        <ColorPicker />
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 16,
  },
  settingsHeadline: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  spacer: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,.2)',
  },
});
