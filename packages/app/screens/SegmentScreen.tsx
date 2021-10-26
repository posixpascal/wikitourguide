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

export default function SegmentScreen({
  navigation,
}: RootTabScreenProps<'Segments'>) {
  const scheme = useColorScheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const linkTo = useLinkTo();

  const handleSegmentSelection = (index) => {
    dispatch(play(true));
    dispatch(nextSynthSegment(index));
    linkTo('/app/player');
  };

  return (
    <BlurView intensity={100} tint={scheme} style={{ height: '100%' }}>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, paddingHorizontal: 15, marginBottom: 20 }}>
          {t('segments.description')}
        </Text>
        <SegmentSelection selectSegment={handleSegmentSelection} />
      </ScrollView>
    </BlurView>
  );
}

const iconOffset = 20;

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
  },
  marginRight: {
    marginRight: 10,
  },
});
