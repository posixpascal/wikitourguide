import { Text, View } from './Themed';
import * as React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import {ActivityIndicator, StyleSheet, useColorScheme} from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchNearbyArticles } from '../features/articles/articles.slice';
import Colors from "../constants/Colors";
import {useAppSelector} from "../hooks/useAppSelector";

export default () => {
  const scheme = useColorScheme();
  const colors = useAppSelector(state => state.settings.colors)

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text>Suche Artikel in deiner Nähe...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  normalText: {
    fontSize: 16,
  },
  bigText: {
    fontSize: 16,
  },
});
