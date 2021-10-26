/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['/app/'],
  config: {
    initialRouteName: 'Player',
    screens: {
      app: '/app/player',
      Playlist: '/app/playlist',
      Map: '/app/map',
      Tours: '/app/tours',
      Settings: '/app/settings',
      RequestLocation: '/app/request-location',
      Search: '/app/search',
      Segments: '/app/segments',
      ApiError: '/app/api_error',
      Portal: '/app/portal',
    },
  },
};

export default linking;
