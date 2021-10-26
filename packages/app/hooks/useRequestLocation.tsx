import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useLinkTo } from '@react-navigation/native';

export function useRequestLocation() {
  const linkTo = useLinkTo();
  useEffect(() => {
    (async () => {
      let { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        linkTo('/app/request-location');
      }
    })();
  }, []);
}
