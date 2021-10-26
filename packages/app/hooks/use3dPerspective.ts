import { useEffect, useState } from 'react';
import { DeviceMotion } from 'expo-sensors';

export function use3dPerspective() {
  const [rotation, setRotation] = useState<any>();

  useEffect(() => {
    let sub;
    (async () => {
      sub = DeviceMotion.addListener(({ rotation }) => {
        setRotation(rotation);
      });
    })();

    return () => sub.remove();
  }, []);

  return { rotation };
}
