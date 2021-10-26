import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../features/articles/articles.slice';
import MapView, { Marker } from 'react-native-maps';
import WebMapView from 'react-native-web-maps';

import * as Location from 'expo-location';
import { useLinkTo } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useAutoScanning } from '../hooks/useAutoScanning';

export default function MapScreen({ navigation }: RootTabScreenProps<'Map'>) {
  useAutoScanning();

  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const linkTo = useLinkTo();
  const { articles } = useSelector((state: any) => state.articles);
  const [myPosition, setMyPosition] = useState({ latitude: 0, longitude: 0 });
  const [mapReady, setMapReady] = useState(
    Platform.select({
      web: false,
      default: true,
    }),
  );

  useEffect(() => {
    const interval = async () => {
      const coords = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords.coords;
      setMyPosition({ latitude, longitude });
    };
    interval();
    //const timer = setInterval(interval, 1000);

    return () => {}; //clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMapReady(true);
    }, 200);
  }, []);

  const setActiveArticle = (article) => {
    dispatch(setActive(article));
    linkTo('/app/player');
  };

  if (!mapReady || !myPosition.latitude || !myPosition.longitude) {
    return (
      <BlurView
        intensity={Platform.select({ ios: 100, default: 2000 })}
        tint={scheme}
        style={[
          styles.container,
          { padding: 10, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size={'large'} />
        <Text></Text>
      </BlurView>
    );
  }

  return Platform.select({
    web: (
      <WebMapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: myPosition.latitude,
          longitude: myPosition.longitude,
        }}
        initialCamera={{
          center: {
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
          },
          zoom: 6,
          heading: 0,
          altitude: 1000,
          pitch: 20,
        }}
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {articles.map((article) => {
          return (
            <WebMapView.Marker
              key={article.pageID}
              title={article.title}
              pinColor={'#4585c4'}
              coordinate={{
                latitude: article.location.coordinates[1],
                longitude: article.location.coordinates[0],
              }}
              onPress={() => setActiveArticle(article)}
            />
          );
        })}
      </WebMapView>
    ),
    default: (
      <BlurView intensity={100} tint={scheme} style={[styles.container]}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialCamera={{
            center: {
              latitude: myPosition.latitude,
              longitude: myPosition.longitude,
            },
            zoom: 6,
            heading: 0,
            altitude: 1000,
            pitch: 20,
          }}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          showsCompass={true}
        >
          {articles.map((article) => {
            return (
              <Marker
                key={article.pageID}
                title={article.title}
                pinColor={'#4585c4'}
                coordinate={{
                  latitude: article.location.coordinates[1],
                  longitude: article.location.coordinates[0],
                }}
                onCalloutPress={() => setActiveArticle(article)}
              />
            );
          })}
        </MapView>
      </BlurView>
    ),
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});
