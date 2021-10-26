import { Article } from '../features/articles/article';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../constants/Colors';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { Theme } from 'react-native-elements';
import { articleCover } from '../features/articles/articles.selectors';
import { useAppSelector } from '../hooks/useAppSelector';

export function ArticleImageBackgrounds({ article }: { article: Article }) {
  const scheme = useColorScheme();
  const articles = useAppSelector((state) => state.articles);
  const [loadImage, setLoadImage] = useState(true);
  const [image, setImage] = useState(null);
  const [showFallback, setShowFallback] = useState(false);
  const colors = useAppSelector(state => state.settings.colors)

  useEffect(() => {
    if (!article) {
      return;
    }

    if (article.images.length) {
      console.log('For article: ', article.title, articleCover(article));
      setShowFallback(false);
      setImage(articleCover(article));
    } else {
      setShowFallback(true);
    }
  }, [article]);

  if (showFallback) {
    return (
      <View
        style={[
          styles.fallback,
          { backgroundColor: Colors[scheme].lightBackground },
        ]}
      >
        <Text style={[styles.textCenter, styles.fallbackTitle]}>
          {article.title}
        </Text>
        <Text style={styles.textCenter}>
          Noch kein Foto vorhanden, du kannst aber jederzeit ein Foto hochladen.
        </Text>
      </View>
    );
  }

  const isWeb = Platform.select({
    default: false,
    web: true,
  });

  return (
    <ImageBackground
      source={{ uri: image }}
      style={styles.leadImage}
      onLoadStart={() => setLoadImage(true)}
      onLoadEnd={() => setLoadImage(false)}
      onError={() => setShowFallback(true)}
    >
      {!isWeb && articles.currentArticle && loadImage ? (
        <ActivityIndicator color={colors.primary} size={'large'} />
      ) : (
        <>
          <Text></Text>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fallback: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    display: 'flex',
    paddingTop: 80,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  fallbackTitle: {
    fontSize: 18,
  },
  leadImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
