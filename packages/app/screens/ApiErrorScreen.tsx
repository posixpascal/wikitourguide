import * as React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PlayerControl from '../components/PlayerControl';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { useKeepAwake } from 'expo-keep-awake';
import { useLinkTo } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { ArticleInfoPanel } from '../components/ArticleInfoPanel';
import { useIntro } from '../hooks/useIntro';
import { useRequestLocation } from '../hooks/useRequestLocation';
import { BlurView } from 'expo-blur';
import { openURL } from 'expo-linking';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAutoScanning } from '../hooks/useAutoScanning';
import PortalIcon from '../components/PortalIcon';
import { useState } from 'react';
import SegmentSelection from '../components/SegmentSelection';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { nextSynthSegment } from '../features/synthesizer/synthesizer.slice';
import { play } from '../features/articles/articles.slice';
import { useTranslation } from 'react-i18next';
import { LottieWithFallback } from '../components/LottieFallback';

export default function ApiErrorScreen({
  navigation,
}: RootTabScreenProps<'ApiError'>) {
  const scheme = useColorScheme();
  const linkTo = useLinkTo();
  const { t } = useTranslation();

  return (
    <BlurView
      intensity={100}
      tint={scheme}
      style={{ backgroundColor: 'red', height: '100%' }}
    >
      <ScrollView style={styles.container}>
        <View
          style={{
            height: 160,
            marginTop: -30,
            backgroundColor: 'transparent',
          }}
        >
          <LottieWithFallback
            source={require('../assets/animations/error.json')}
            autoPlay={true}
            loop={true}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{t('apiError.description')}</Text>

        <Text style={{ fontSize: 20, marginVertical: 30 }}>
          {t('apiError.description2')}
        </Text>
        <TouchableOpacity onPress={() => linkTo('/app/player')}>
          <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 40 }}>
            {t('apiError.cta')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BlurView>
  );
}

const iconOffset = 20;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
  },
  marginRight: {
    marginRight: 10,
  },
});
