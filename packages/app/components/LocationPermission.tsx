import * as WebBrowser from 'expo-web-browser';
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'expo-linking';
import { FontAwesome } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';

export default function LocationPermission() {
  const scheme = useColorScheme();
  const [locationGranted, setLocationGranted] = useState(null);

  useEffect(() => {
    (async () => {
      let { granted } = await Location.getForegroundPermissionsAsync();
      setLocationGranted(granted);
    })();
  }, []);

  const { t } = useTranslation();
  const requestLocationPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    setLocationGranted(granted);
  };

  return (
    <View style={styles.requestLocationView}>
      <View style={styles.emptyBox}>
        <FontAwesome
          name={'map'}
          size={72}
          adjustsFontSizeToFit={true}
          style={[styles.emptyIcon, { color: Colors[scheme].tint }]}
        />
      </View>

      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          {t('requestLocation.body')}
        </Text>
      </View>

      {locationGranted ? (
        <Button
          containerStyle={styles.button}
          buttonStyle={styles.success}
          title={'Standort freigegeben'}
          onPress={requestLocationPermission}
        />
      ) : (
        <>
          <Button
            containerStyle={styles.button}
            title={'Standort freigeben'}
            onPress={requestLocationPermission}
          />
          {/*<Button
            containerStyle={styles.secondaryButton}
            title={'Anonym weitermachen'}
            onPress={requestLocationPermission}
        />*/}
        </>
      )}

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={openSettings} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            {t('requestLocation.gotoSettings')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyIcon: {},
  requestLocationView: {
    paddingHorizontal: 20,
  },
  button: {
    minWidth: 250,
    alignSelf: 'center',
    marginVertical: 15,
  },
  secondaryButton: {
    minWidth: 250,
    alignSelf: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  success: {
    backgroundColor: Colors.light.green,
  },
});
