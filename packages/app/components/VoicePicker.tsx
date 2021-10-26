import * as React from 'react';
import { createRef, useEffect, useState } from 'react';
import { Text, View } from './Themed';
// @ts-ignore
import LottieView from 'lottie-react-native';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setVoice } from '../features/settings/settings.slice';
import { Audio } from 'expo-av';
import { LottieWithFallback } from './LottieFallback';
import * as Speech from 'expo-speech';

const names = {
  jens: require('../assets/sounds/introduce-jens.mp3'),
  pauline: require('../assets/sounds/introduce-pauline.mp3'),
    miriam: require('../assets/sounds/introduce-miriam.mp3'),

};

export function VoicePicker() {
  const dispatch = useAppDispatch();
  const voices = ['OnDeviceSynth', 'de-DE-Standard-C', 'de-DE-Wavenet-B', 'de-DE-Wavenet-A'];
  const voice = useAppSelector((state) => state.settings.voice);

  useEffect(() => {
    Platform.select({
      web: () => {},
      default: () => {
        //maleA.current.pause();
        //femaleA.current.pause();
        //
        //if (voice === 'de-DE-Wavenet-B') maleA.current.play();
        //
        //if (voice === 'de-DE-Wavenet-A') femaleA.current.play();
      },
    })();
  }, [voice]);

  const introduce = async (name) => {
      if (name === 'susi'){
          await Speech.speak("Hallo! Ich bin Susi und bin eine digitale Stimme!");
          await Vibration.vibrate(2);
          return;
      }
    const currentSound = new Audio.Sound();
    await currentSound.loadAsync(names[name]);
    await currentSound.playAsync();
    await Vibration.vibrate(2);
    return currentSound;
  };

  const change = async (voice) => {
    dispatch(setVoice(voice));
    await AsyncStorage.setItem('voice', voice);
  };

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <View style={styles.wrapper}>
        <View
            style={[
              styles.characterWrapper,
              voice === 'OnDeviceSynth' ? styles.characterWrapperActive : {}
            ]}
        >
          <TouchableOpacity
              style={{
                borderColor: 'transparent',
                borderWidth: 0,
                alignSelf: 'center',
              }}
              onLongPress={() => {
                introduce('susi');
                change('OnDeviceSynth');
              }}
              onPress={() => change('OnDeviceSynth')}
          >
            <LottieWithFallback
                style={
                  [
                      voice === 'OnDeviceSynth'
                      ? styles.characterActive
                      : styles.character, styles.robot]
                }
                autoPlay={true}
                loop={true}
                source={require('../assets/animations/robot_a.json')}
            />
          </TouchableOpacity>
          <Text
              style={[
                styles.characterName,
                voice === 'OnDeviceSynth' ? styles.characterBold : {},
              ]}
          >
           Susi
          </Text>
        </View>



















        <View
            style={[
              styles.characterWrapper,
              voice === 'de-DE-Standard-C' ? styles.characterWrapperActive : {},
            ]}
        >
          <TouchableOpacity
              style={{
                borderColor: 'transparent',
                borderWidth: 0,
                alignSelf: 'center',
              }}
              onLongPress={() => {
                introduce('miriam');
                change('de-DE-Standard-C');
              }}
              onPress={() => change('de-DE-Standard-C')}
          >
            <LottieWithFallback
                style={
                  voice === 'de-DE-Standard-C'
                      ? styles.characterActive
                      : styles.character
                }
                autoPlay={true}
                loop={true}
                source={require('../assets/animations/female_b.json')}
            />
          </TouchableOpacity>
          <Text
              style={[
                styles.characterName,
                voice === 'de-DE-Standard-C' ? styles.characterBold : {},
              ]}
          >
           Miriam
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.characterWrapper,
            voice === 'de-DE-Wavenet-B' ? styles.characterWrapperActive : {},
          ]}
        >
          <TouchableOpacity
            style={{
              borderColor: 'transparent',
              borderWidth: 0,
              alignSelf: 'center',
            }}
            onLongPress={() => {
                introduce('jens');
                //change('de-DE-Wavenet-B');
            }}
            onPress={() => 0/*change('de-DE-Wavenet-A')*/}
          >
            <LottieWithFallback
              style={
                voice === 'de-DE-Wavenet-B'
                  ? styles.characterActive
                  : styles.character
              }
              autoPlay={true}
              loop={true}
              source={require('../assets/animations/male_a.json')}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.characterName,
              voice === 'de-DE-Wavenet-B' ? styles.characterBold : {},
            ]}
          >
            Jens
          </Text>
            <Text style={styles.pro}>Premium</Text>
        </View>

        <View
          style={[
            styles.characterWrapper,
            voice === 'de-DE-Wavenet-A' ? styles.characterWrapperActive : {},
          ]}
        >
          <TouchableOpacity
            style={{
              borderColor: 'transparent',
              borderWidth: 0,
              alignSelf: 'center',
            }}
            onLongPress={() => {
              introduce('pauline');
              //change('de-DE-Wavenet-A');
            }}
            onPress={() => 0/*change('de-DE-Wavenet-A')*/}
          >
            <LottieWithFallback
              style={
                voice === 'de-DE-Wavenet-A'
                  ? styles.characterActive
                  : styles.character
              }
              autoPlay={true}
              loop={true}
              source={require('../assets/animations/female_a.json')}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.characterName,
              voice === 'de-DE-Wavenet-A' ? styles.characterBold : {},
            ]}
          >
            Pauline
          </Text>
            <Text style={styles.pro}>Premium</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  characterWrapper: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.5,
    flex: 1,
  },
  characterWrapperActive: {
    opacity: 1,
  },
  characterBold: {
    fontWeight: 'bold',
  },
  characterName: {
    textAlign: 'center',
    fontSize: 24,
  },
  wrapper: {
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  character: {
    width: 148,
    height: 148,
    backgroundColor: 'transparent',
  },
    characterActive: {
        width: 148,
        height: 148,
        backgroundColor: 'transparent',
    },
    robot: {
      width: 114,
        height:114,
        position: 'relative',
        top: 10
    },
    pro: {
        color: 'red',
        fontSize: 12,
        position: "relative",
        display: "flex"
    }
});
