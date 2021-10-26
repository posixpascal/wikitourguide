import * as React from 'react';
import { View, Text } from './Themed';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import TouchableScale from 'react-native-touchable-scale';

export const Card = ({
  title,
  onPress,
  description,
  image,
  children,
}: {
  title: string;
  onPress: any;
  image: any;
  description: any;
  children: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardWrapper}>
        <ImageBackground
          imageStyle={styles.cardWrapper}
          source={image}
          style={styles.card}
        >
          <View style={styles.cardOverlay}>
            <Text style={styles.mainText}>{title}</Text>
            <Text numberOfLines={3} style={styles.description}>
              {description}
            </Text>
            {children}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  description: {
    color: Colors.dark.text,
    textAlign: 'center',
    padding: 10,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  card: {
    width: Dimensions.get('window').width - 20,
    height: 240,
    margin: 10,
  },
  mainText: {
    fontStyle: 'italic',
    fontFamily: 'Times New Roman',
    color: Colors.dark.text,
    fontSize: 38,
  },
});
