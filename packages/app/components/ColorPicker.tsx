import * as React from 'react';
import { View } from './Themed';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setColor } from '../features/settings/settings.slice';

export function ColorPicker() {
  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.settings.colors);

  const colors = [
    {
      primary: '#4585c4',
      primary1: '#56BCD7',
      primary2: '#1F4EA1',
    },

    {
      primary: '#c44545',
      primary1: '#d75656',
      primary2: '#a31f1f',
    },

    {
      primary: '#c48545',
      primary1: '#d79656',
      primary2: '#a3611f',
    },
    {
      primary: '#6fc445',
      primary1: '#81d756',
      primary2: '#4ba31f',
    },
    {
      primary: '#c44589',
      primary1: '#d7569b',
      primary2: '#a31f65',
    },
    {
      primary: '#7e45c4',
      primary1: '#9056d7',
      primary2: '#5a1fa3',
    },
    {
      primary: '#f6c913',
      primary1: '#d1c33d',
      primary2: '#b6a039',
    },
    {
      primary: '#45c48d',
      primary1: '#56d79f',
      primary2: '#1fa36a',
    },
    {
      primary: '#45b1c4',
      primary1: '#56c4d7',
      primary2: '#1f8fa3',
    },
  ];

  const active = colors.findIndex((c) => c.primary === color.primary);

  const change = async (index) => {
    dispatch(setColor(colors[index]));
    await AsyncStorage.setItem('colors', JSON.stringify(colors[index]));
  };

  return (
    <View style={[styles.transparent]}>
      <View style={[styles.transparent, styles.group]}>
        {colors.map((color, index) => (
          <TouchableOpacity
            onPress={() => change(index)}
            key={color.primary}
            style={styles.gradientWrapper}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={[color.primary, color.primary2]}
              style={[
                styles.gradient,
                index === active ? styles.gradientActive : {},
              ]}
            ></LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const gradientSize = 48;

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexBasis: '100%',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  gradientWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '33%',
    width: gradientSize * 2,
    height: gradientSize * 2,
  },
  gradient: {
    width: gradientSize,
    height: gradientSize,
    borderRadius: 4,
  },
  gradientActive: {
    width: gradientSize * 1.5,
    height: gradientSize * 1.5,
  },
  text: {},
});
