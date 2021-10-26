import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RootStackScreenProps } from '../types';
import { Card } from '../components/Card';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function TourScreen({
  navigation,
}: RootStackScreenProps<'Tours'>) {
  const playTour = () => {};
  return (
    <ScrollView>
      <Text style={styles.main}></Text>
      <Card
        image={require('../assets/tours/frankfurt.jpg')}
        onPress={playTour}
        title={'True Crime Frankfurt'}
        description={
          'Erlebe eine spannende und düstere Reise durch die Skyline Stadt. Verfolge reale Begebenheiten und sei dem Verbrechen so nah wie nie zuvor.'
        }
      >
        <Text style={styles.action}>
          <FontAwesome5 style={styles.actionIcon} name={'headset'} />{' '}
          <Text>8 Spots</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'route'} />{' '}
          <Text>2.8 km</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'star'} />{' '}
          <Text>4928</Text>
        </Text>
      </Card>

      <Card
        image={require('../assets/tours/munich.png')}
        onPress={playTour}
        title={'München Arts & Craft'}
        description={'Eine kulturgespickte Reise durch das gemalte München.'}
      >
        <Text style={styles.action}>
          <FontAwesome5 style={styles.actionIcon} name={'headset'} />{' '}
          <Text>14 Spots</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'route'} />{' '}
          <Text>6.4 km</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'star'} />{' '}
          <Text>3238</Text>
        </Text>
      </Card>

      <Card
        image={require('../assets/tours/berlin.png')}
        onPress={playTour}
        title={'Berlin Hotspots'}
        description={'Zu besuch? Diese Tour musst du gemacht haben.'}
      >
        <Text style={styles.action}>
          <FontAwesome5 style={styles.actionIcon} name={'headset'} />{' '}
          <Text>24 Spots</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'route'} />{' '}
          <Text>8.3 km</Text>
          <View style={{ width: 20 }}></View>
          <FontAwesome5 style={styles.actionIcon} name={'star'} />{' '}
          <Text>2828</Text>
        </Text>
      </Card>

      <Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    paddingBottom: 0,
    fontSize: 18,
  },
  action: {
    color: Colors.dark.text,
    fontSize: 20,
  },
  actionIcon: {
    color: Colors.dark.text,
    fontSize: 20,
    marginLeft: 10,
  },
});
