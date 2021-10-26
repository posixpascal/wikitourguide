import { Text, View } from './Themed';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useEffect, useState } from 'react';
import { markRead, next, setActive } from '../features/articles/articles.slice';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { API_URL } from '../config';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Colors from '../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { ArticleImageBackgrounds } from './ArticleImageBackgrounds';

export default () => {
  const scheme = useColorScheme();
  const [loadImage, setLoadImage] = useState(false);
  const nextArticle = () => {
    dispatch(next());
  };

  const dispatch = useDispatch();
  const { articles, currentArticle, playing } = useSelector(
    (state: any) => state.articles,
  );

  return <ArticleImageBackgrounds article={currentArticle} />;
};

const styles = StyleSheet.create({});
