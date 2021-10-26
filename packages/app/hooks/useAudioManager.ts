import {Audio} from 'expo-av';
import {useState} from 'react';
import {useAppSelector} from './useAppSelector';
import * as Speech from 'expo-speech';
import {Platform} from "react-native";
import {PitchCorrectionQuality} from "expo-av/build/AV";

export enum AudioState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'pause',
  STOPPED = 'stop',
}

export function useAudioManager() {
  const settings = useAppSelector((state) => state.settings);

  const [currentUrl, setCurrentUrl] = useState(null);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [audioObject, setAudioObject] = useState<Audio.Sound>(
    new Audio.Sound(),
  );
  const [audioStatus, setAudioStatus] = useState<AudioState>(AudioState.IDLE);

  const voiceControl = {
    load: async (uri, andPlay = false, segment) => {
      if (await Speech.isSpeakingAsync()) await Speech.stop();
      setCurrentSegment(segment);
      setCurrentUrl(uri);

      if (andPlay) {
        await voiceControl.play();
        setAudioStatus(AudioState.PLAYING);
      }
    },
    pause: async () => {
      console.log('pause');
      await Platform.select({
        android: async () => await Speech.stop(),
        ios: async () => await Speech.pause()
      })();
      setAudioStatus(AudioState.PAUSED);
    },
    play: async () => {
      console.log(currentSegment.text);
      await Speech.speak(`
      ${currentSegment.title}.
      
      ${currentSegment.text}`, {
        rate: settings.rate,
        pitch: settings.pitch
      });
      setAudioStatus(AudioState.PLAYING);

    },
    stop: async () => {
      await Speech.stop();
      setAudioStatus(AudioState.STOPPED);
    },
    resume: async () => {
      await Platform.select({
        android: async () => await voiceControl.play(),
        ios: async () => await Speech.resume()
      })();
      setAudioStatus(AudioState.PLAYING);
    }
  };

  const audioControl = {
    load: async (uri, andPlay = false) => {
      console.info('[AudioControl]: load');
      if (audioObject._loaded) await audioObject.unloadAsync();

      await audioObject.loadAsync({
        uri,
      });
      setCurrentUrl(uri);
      if (andPlay) {
        await audioObject.setRateAsync(settings.rate, true, PitchCorrectionQuality.High);
        await audioObject.playAsync();
        setAudioStatus(AudioState.PLAYING);
      }
    },
    pause: async () => {
      console.info('[AudioControl]: pause');
      if (audioObject._loaded) {
        await audioObject.pauseAsync();
        setAudioStatus(AudioState.PAUSED);
      }
    },
    play: async () => {
      console.info('[AudioControl]: play');
      if (audioObject._loaded) {
        await audioObject.playAsync();
        setAudioStatus(AudioState.PLAYING);
      }
    },
    stop: async () => {
      console.info('[AudioControl]: stop');
      if (audioObject._loaded) {
        await audioObject.stopAsync();
        setAudioStatus(AudioState.STOPPED);
      }
    },
    resume: async () => {
      console.info('[AudioControl]: resume');
      if (audioObject._loaded) {
        await audioObject.playAsync();
        setAudioStatus(AudioState.PLAYING);
      }
    },
  };

  const audioSubscription = {
    unsubscribe() {
      audioObject._clearSubscriptions();
    },
    subscribe(cb) {
      audioObject._clearSubscriptions();
      audioObject.setOnPlaybackStatusUpdate(cb);
    },
  };

  return {
    audioStatus,
    currentUrl,
    audioObject,
    audioControl,
    voiceControl,
    audioSubscription,
  };
}
