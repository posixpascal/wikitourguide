import { Text, View } from './Themed';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../store';
import { useAppSelector } from '../hooks/useAppSelector';
import { CompleteArticle } from './CompleteArticle';

export function ArticleInfoPanel() {
  const insets = useSafeAreaInsets();
  const colors = useAppSelector(state => state.settings.colors)
  const { articles } = useAppSelector((state: RootState) => state);
  const scheme = useColorScheme();
  const [showMore, setShowMore] = useState(false);
  const slideAnimation = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: showMore ? (-1 * Dimensions.get('window').height) / 2 + 100 : 20,
      useNativeDriver: true,
    }).start();
  }, [showMore]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Animated.View
      style={[
        styles.slideUp,
        {
          transform: [
            {
              translateY: slideAnimation,
            },
          ],
        },
        {
          minHeight: 80,
          backgroundColor: Platform.select({
            web: Colors[scheme].lightBackground,
            default: 'transparent',
          }),
        },
      ]}
    >
      <BlurView intensity={96} tint={scheme}>
        <TouchableOpacity
          disabled={!articles.currentArticle}
          onPress={toggleShowMore}
        >
          <View
            style={[
              styles.currentArticle,
              {
                minHeight: 80,
                backgroundColor: Platform.select({
                  web: Colors[scheme].lightBackground,
                  default: '',
                }),
                borderBottomColor:
                  scheme === 'light'
                    ? 'rgba(155,155,155,.5)'
                    : 'rgba(0,0,0,.4)',
              },
              showMore
                ? {
                    marginTop: insets.top,
                  }
                : {},
            ]}
          >
            {articles.currentArticle ? (
              <FontAwesome5
                style={[
                  styles.showMore,
                  { color: Colors[scheme].text },
                  showMore ? { bottom: 25 } : {},
                ]}
                name={showMore ? 'chevron-down' : 'chevron-up'}
                size={24}
              />
            ) : (
              <ActivityIndicator size={'large'} color={colors.primary} style={{ marginLeft: 20 }} />
            )}
            <Text
              style={[
                styles.currentArticleText,
                showMore ? { bottom: 20 } : {},
              ]}
              numberOfLines={1}
            >
              {articles.currentArticle
                ? articles.currentArticle.title
                : 'Suche Artikel...'}
            </Text>
          </View>
        </TouchableOpacity>
        <CompleteArticle article={articles.currentArticle} />
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  showMore: {
    paddingLeft: 20,
    position: 'absolute',
  },
  slideUp: {
    width: '100%',
    transform: [{ translateY: 0 }],
    zIndex: 2,
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 100,
  },

  currentArticleText: {
    fontSize: 24,
    flex: 1,
    width: Dimensions.get('window').width - 100,
    position: 'absolute',
    left: 60,
    top: 25,
    textAlign: 'center',
  },

  currentArticle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 0.5,
  },

  currentArticleExpanded: {
    height: 80,
    alignItems: 'flex-end',
  },
});
