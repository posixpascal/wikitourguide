/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ColorSchemeName,
  Image,
  Platform,
  Pressable,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RequestLocationScreen from '../screens/RequestLocationScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PlayerScreen from '../screens/PlayerScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useTranslation } from 'react-i18next';
import SettingsScreen from '../screens/SettingsScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import MapScreen from '../screens/MapScreen';
import TourScreen from '../screens/TourScreen';
import { BlurEffectTypes } from 'react-native-screens/lib/typescript/index.native';
import { View } from '../components/Themed';
import SearchScreen from '../screens/SearchScreen';
import SegmentScreen from '../screens/SegmentScreen';
import ApiErrorScreen from '../screens/ApiErrorScreen';
import PortalScreen from '../screens/PortalScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) =>
          `Wiki Tour Guide - ${options?.title ?? route?.name}`,
      }}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="app"
        component={PlayerScreen}
        options={{
          headerTitle: '',
          headerShown: false,
          headerBlurEffect: 'light',
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Portal"
          component={PortalScreen}
          options={{
            animation: 'flip',
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerTransparent: Platform.select({
                ios: true,
              default: false,
            }),
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('map.title'),
          }}
        />

        <Stack.Screen
          name="Segments"
          component={SegmentScreen}
          options={{
            headerTransparent: Platform.select({
              web: false,
              default: true,
            }),
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('segments.title'),
          }}
        />

        <Stack.Screen
          name="ApiError"
          component={ApiErrorScreen}
          options={{
            headerTransparent: Platform.select({
              web: false,
              default: true,
            }),
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: 'rgba(255,0,0,.6)',
              }),
            },
            headerTitle: t('apiError.title'),
          }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTransparent: true,
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('search.title'),
          }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTransparent: true,
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('settings.title'),
          }}
        />

        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            headerTransparent: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('playlist.title'),
          }}
        />
        <Stack.Screen
          name="RequestLocation"
          component={RequestLocationScreen}
          options={{
            headerTransparent: true,
            headerLargeTitle: true,
            contentStyle: {
              backgroundColor: Platform.select({
                web: Colors[colorScheme].background,
                default: '',
              }),
            },
            headerTitle: t('requestLocation.title'),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <BottomTab.Navigator
      initialRouteName="Player"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Player"
        component={PlayerScreen}
        options={({ navigation }: RootTabScreenProps<'Player'>) => ({
          headerTitle: 'Wiki Tour Guide',
          title: t('tabs.player'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="play-circle" color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require('../assets/images/icon.png')}
              height={32}
              width={32}
              style={{ marginLeft: 10, width: 32, height: 32 }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 10,
              })}
            >
              <FontAwesome
                name="cog"
                size={25}
                color={Colors[colorScheme].text}
              />
            </Pressable>
          ),
        })}
      />

      <BottomTab.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={{
          title: t('tabs.playlist'),
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      {Platform.select({
        native: (
          <BottomTab.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: t('tabs.map'),
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="map" color={color} />
              ),
            }}
          />
        ),
        default: <></>,
      })}

      <BottomTab.Screen
        name="Tours"
        component={TourScreen}
        options={{
          title: t('tabs.tour'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-signs" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
