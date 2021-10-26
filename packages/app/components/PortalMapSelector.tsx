import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import WebMapView from 'react-native-web-maps';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export function PortalMapSelector() {
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

  return (
    <>
      <MapView
        style={styles.map}
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
      ></MapView>
    </>
  );
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
    height: 400,
  },
});
