import * as React from 'react';
import { useEffect } from 'react';
import {
  Dimensions,
  Platform, StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import { View } from '../components/Themed';
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
import * as Speech from 'expo-speech';
export default function PlayerScreen({
  navigation,
}: RootTabScreenProps<'Player'>) {
  useKeepAwake();
  useIntro();
  useRequestLocation();
  useAutoScanning();

  const scheme = useColorScheme();
  const linkTo = useLinkTo();
  const { currentArticle, apiUnavailable } = useAppSelector(
    (state) => state.articles,
  );

  useEffect(() => {
    if (apiUnavailable) {
      linkTo('/app/api_error');
    }
  }, [apiUnavailable]);

  return (
    <View
      style={{
        height: Dimensions.get('window').height + StatusBar.currentHeight!,
        backgroundColor: Colors[scheme].background,
      }}
    >
      <View style={styles.head}>
        <CurrentlyPlaying />
      </View>
      <ArticleInfoPanel />
      <BlurView intensity={Platform.select({ ios: 100, default: 2000 })} tint={scheme} style={[styles.body]}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: Platform.select({
                web: Colors[scheme].background,
                default: 'transparent',
              }),
            },
          ]}
        >
          {currentArticle ? (
            <View style={styles.wikipediaIcon}>
              <TouchableOpacity
                onPress={() => openURL(currentArticle.url)}
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              >
                <FontAwesome5
                  name={'wikipedia-w'}
                  size={24}
                  style={[{ color: Colors[scheme].icon }]}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <PlayerControl />
          <View style={styles.segmentsIcon}>
            <TouchableOpacity
              onPress={() => linkTo('/app/segments')}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <FontAwesome5
                name={'list-ol'}
                size={24}
                style={[{ color: Colors[scheme].icon }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsIcon}>
            <TouchableOpacity
              onPress={() => linkTo('/app/settings')}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <FontAwesome5
                name={'wrench'}
                size={24}
                style={[{ color: Colors[scheme].icon }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsIcon}>
            <TouchableOpacity
              onPress={() => linkTo('/app/settings')}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <FontAwesome5
                name={'wrench'}
                size={24}
                style={[{ color: Colors[scheme].icon }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const iconOffset = 20;

const styles = StyleSheet.create({
  head: {
    maxHeight: Dimensions.get('window').height / 2 - 0,
  },

  body: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: Dimensions.get('window').height / 2,
    zIndex: 2,
  },

  searchIcon: {
    display: "none",
    position: 'absolute',
    backgroundColor: 'transparent',
    top: iconOffset,
    left: iconOffset,
  },

  playback: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: iconOffset,
    left: iconOffset,
  },

  warningIcon: {
    display: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
    left: iconOffset,
    bottom: iconOffset,
  },

  wikipediaIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: iconOffset,
    right: iconOffset,
  },

  segmentsIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: iconOffset,
    bottom: iconOffset,
  },

  settingsIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: iconOffset,
    right: iconOffset,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
