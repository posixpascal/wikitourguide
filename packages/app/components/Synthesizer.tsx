import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  fetchSynthForArticle,
  nextSynthSegment,
  playSynth,
  updateSynth,
} from '../features/synthesizer/synthesizer.slice';
import { Audio } from 'expo-av';
import { markRead, next } from '../features/articles/articles.slice';
import { AudioState, useAudioManager } from '../hooks/useAudioManager';

// Read the current synth article if audio player is playing.
export function Synthesizer({ navigation }) {
  const {
    audioStatus,
    audioObject,
    audioControl,
      voiceControl,
    audioSubscription,
    currentUrl,
  } = useAudioManager();
  const duration = useAppSelector((state) => state.settings.duration);
  const [audioReady, setAudioReady] = useState(false);
  const settings = useAppSelector(state => state.settings);
  const synth = useAppSelector((state) => state.synthesizer);
  const { playing, currentArticle } = useAppSelector((state) => state.articles);
  const voice = useAppSelector((state) => state.settings.voice);
  const dispatch = useAppDispatch();

  const controller : any = () => settings.voice === 'OnDeviceSynth' ? voiceControl : audioControl;

  const handleStatusUpdate = (status) => {
    dispatch(updateSynth(status));
    if (status.didJustFinish) {
      audioSubscription.unsubscribe();
      dispatch(markRead(currentArticle));
      let wantedLength = synth.pipeline.segments.length;
      switch (duration) {
        case 'extrashort':
          wantedLength = 1;
          break;
        case 'short':
          wantedLength = 2;
          break;
        case 'medium':
          wantedLength = 4;
          break;
        default:
          wantedLength = synth.pipeline.segments.length;
      }
      if (synth.pipelineSegmentIndex + 1 >= wantedLength) {
        dispatch(next());
        return;
      }
      dispatch(nextSynthSegment(synth.pipelineSegmentIndex + 1));
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    }).then(() => {
      setAudioReady(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!audioReady || !currentArticle) {
        return;
      }

      console.log('checking whether to play or not');
      if (
        synth.pipeline &&
        audioObject &&
        currentArticle.pageID !== synth.pipeline.pageID
      ) {
        await controller().stop();
      } else if (audioObject._loaded && !playing) {
        await controller().pause();
      } else if (audioObject._loaded) {
        await controller().resume();
      }

      // Article not ready yet
      if (!synth.articles[voice][currentArticle.pageID]) {
        await dispatch(
          fetchSynthForArticle({ article: currentArticle, voice }),
        );
        console.log('Fetched synth for neu isenburg');
        await dispatch(playSynth(synth.articles[voice][currentArticle.pageID]));
        console.log('playing synth');
        return;
      }

      dispatch(playSynth(synth.articles[voice][currentArticle.pageID]));
    })();
  }, [currentArticle, voice, synth.articles, audioReady]);

  useEffect(() => {
    if (!audioObject || !synth.pipeline || !synth.pipeline.segments) {
      return;
    }
    const segment = synth.pipeline.segments[synth.pipelineSegmentIndex];
    const isStillTheSameTrack = currentUrl === segment.url;

    if (isStillTheSameTrack && audioStatus === AudioState.PAUSED && playing) {
      controller().resume();
      return;
    }

    if (isStillTheSameTrack && audioStatus === AudioState.PLAYING && !playing) {
      controller().pause();
      return;
    }

    if (!playing) {
      return;
    }

    (async () => {
      await controller().stop();
      // Audio article in pipeline or pipeline changed.
      console.log(
        'Playing: ',
        synth.pipeline.pageID + ' segment ',
        synth.pipelineSegmentIndex,
      );

      const segment = synth.pipeline.segments[synth.pipelineSegmentIndex];
      if (currentUrl === segment.url) {
        await controller().resume();
      } else {
        await controller().load(segment.url, true, segment);
      }

      console.log('Finished segment');
      audioSubscription.subscribe(handleStatusUpdate);
    })();
  }, [playing, synth.pipelineSegmentIndex]);

  return <></>;
}
