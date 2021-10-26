import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { next, prev, toggle } from '../features/articles/articles.slice';
import { RootState } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { DeviceMotion } from 'expo-sensors';
import { use3dPerspective } from '../hooks/use3dPerspective';
import { useAppSelector } from '../hooks/useAppSelector';

function getHeading(lat1, lon1, lat2, lon2) {
  // @ts-ignore
  var lat1 = (lat1 * Math.PI) / 180;
  // @ts-ignore
  var lat2 = (lat2 * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;

  var y = Math.sin(dLon) * Math.cos(lat2);
  var x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  var brng = Math.atan2(y, x);

  return ((brng * 180) / Math.PI + 360) % 360;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default () => {
  const scheme = useColorScheme();
  const linkTo = useLinkTo();
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [rotation, setRotation] = useState(0);
  const { playing, currentArticle } = useSelector(
    (state: RootState) => state.articles,
  );
  const onForward = () => dispatch(next());
  const onBackward = () => dispatch(prev());
  const togglePlayer = () => dispatch(toggle());
  const rotationAnimation = new Animated.Value(rotation);
  const colors = useAppSelector((state) => state.settings.colors);

  useEffect(() => {
    const watcher = Location.watchPositionAsync(
      {
        accuracy: LocationAccuracy.BestForNavigation,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition({ latitude, longitude });
      },
    );

    return () => watcher.then((s) => s.remove());
  }, []);

  useEffect(() => {
    if (!position || !currentArticle) {
      return;
    }

    const compassSubscription = Location.watchHeadingAsync((newHeading) => {
      const headingFromNorth = getHeading(
        position.latitude,
        position.longitude,
        currentArticle.location.coordinates[1],
        currentArticle.location.coordinates[0],
      );
      setRotation(headingFromNorth - newHeading.trueHeading);
    });

    return () => compassSubscription.then((s) => s.remove());
  }, [currentArticle, position]);

  useEffect(() => {
    rotationAnimation.setValue(rotation);
  }, [rotation]);

  const colorScheme = useColorScheme();
  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <AnimatedLinearGradient
        style={styles.outerCircle}
        colors={[colors.primary1, colors.primary2]}
      >
        <View
          style={[
            styles.innerCircle,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <TouchableOpacity onPress={togglePlayer}>
            <FontAwesome
              name={playing ? 'pause' : 'play'}
              size={playIconSize}
              style={{
                color: colors.primary,
                paddingLeft: playing ? 0 : 16,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.actionIcon, styles.actionIconLeft]}>
          <TouchableOpacity onPress={() => onBackward()}>
            <FontAwesome
              name={'backward'}
              size={iconSize}
              style={{ color: '#fff' }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.actionIcon, styles.actionIconRight]}>
          <TouchableOpacity onPress={() => onForward()}>
            <FontAwesome
              name={'forward'}
              size={iconSize}
              style={{ color: '#fff' }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.actionIcon, styles.actionIconTop]}>
          <TouchableOpacity onPress={() => linkTo('/app/playlist')}>
            <FontAwesome
              name={'list'}
              size={iconSize}
              style={{ color: '#fff' }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.actionIcon, styles.actionIconBottom]}>
          <TouchableOpacity onPress={() => linkTo('/app/map')}>
            <FontAwesome
              name={'map'}
              size={iconSize}
              style={{ color: '#fff' }}
            />
          </TouchableOpacity>
        </View>
      </AnimatedLinearGradient>

      <Animated.View
        style={[
          styles.compassCircle,
          {
            transform: [
              {
                rotate: rotationAnimation.interpolate({
                  inputRange: [0, 360, 720],
                  outputRange: ['0deg', '360deg', '720deg'],
                }),
              },
              { perspective: 1000 },
            ],
          },
          Platform.select({
            default: {},
            web: { display: 'none' },
          }),
        ]}
      >
        <View
          style={[
            styles.compassNeedle,
            {
              borderBottomColor: colors.primary2,
            },
          ]}
        ></View>
      </Animated.View>
    </View>
  );
};

// Dynamically size all components
const widthBased = Dimensions.get('window').width - 48;
const heightBased = Dimensions.get('window').height / 2 - 60;

const circleSize = widthBased > heightBased ? heightBased : widthBased;
const innerCircleSize = circleSize / 1.75;
const outerCircleSize = circleSize;
const iconSize = circleSize / 10;
const playIconSize = circleSize / 3.2;
const needleSize = circleSize / 20;
const compassCircleSize = circleSize + needleSize * 2;

const styles = StyleSheet.create({
  compassCircle: {
    position: 'absolute',
    left: -1 * needleSize,
    top: -1 * needleSize,
    width: compassCircleSize,
    height: compassCircleSize,
    zIndex: -1,
    alignItems: 'center',
  },
  compassNeedle: {
    height: needleSize,
    width: needleSize,
    zIndex: 21,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: needleSize * 2,
    borderBottomWidth: needleSize * 3,
    borderLeftWidth: needleSize * 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  outerCircle: {
    borderRadius: outerCircleSize / 2,
    width: outerCircleSize,
    height: outerCircleSize,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  actionIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  actionIconLeft: {
    left: (outerCircleSize - innerCircleSize) / 2 - iconSize * 1.66,
  },
  actionIconRight: {
    right: (outerCircleSize - innerCircleSize) / 2 - iconSize * 1.66,
  },
  actionIconTop: {
    top: (outerCircleSize - innerCircleSize) / 2 - iconSize * 1.5,
    borderRadius: 40,
  },
  actionIconBottom: {
    bottom: (outerCircleSize - innerCircleSize) / 2 - iconSize * 1.5,
  },
  innerCircle: {
    borderRadius: innerCircleSize,
    alignItems: 'center',
    justifyContent: 'center',
    width: innerCircleSize,
    height: innerCircleSize,
  },
});
