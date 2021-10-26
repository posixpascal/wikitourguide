import * as React from 'react';
import { useEffect } from 'react';
import {
  Dimensions,
  ImageBackground, Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { RootStackScreenProps } from '../types';
import { useDispatch } from 'react-redux';
import {
  fetchNearbyArticles,
  setActive,
} from '../features/articles/articles.slice';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { useLinkTo } from '@react-navigation/native';
import { useAppSelector } from '../hooks/useAppSelector';
import { BlurView } from 'expo-blur';
import {
  articleCover,
  formatDistance,
} from '../features/articles/articles.selectors';

export default function PlaylistScreen({
  navigation,
}: RootStackScreenProps<'Playlist'>) {
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const scheme = useColorScheme();
  const articleStore = useAppSelector((state) => state.articles);
  const { currentArticle, articles, playing } = articleStore;

  useEffect(() => {
    dispatch(fetchNearbyArticles());
  }, []);

  const setActiveArticle = (article) => {
    dispatch(setActive(article));
    linkTo('/app/player');
  };

  return (
    <BlurView intensity={100} tint={scheme} style={{ height: '100%',  paddingTop: Platform.select({
        default: 0,
        android: 30
      })
    }}>
      <ScrollView style={styles.container}>
        {articles.map((article) => (
          <TouchableOpacity
            key={article.pageID}
            onPress={() => setActiveArticle(article)}
          >
            <View
              style={[
                styles.listItem,
                article.read ? { opacity: 0.8 } : {},
                { borderBottomColor: 'rgba(0,0,0,.2)' },
              ]}
              key={article.pageID}
            >
              <ImageBackground
                style={styles.image}
                source={{ uri: articleCover(article) }}
              >
                <Text>
                  {currentArticle &&
                  currentArticle.pageID === article.pageID ? (
                    <View style={styles.currentlyPlaying}>
                      <FontAwesome
                        size={32}
                        style={{ paddingRight: 10 }}
                        color={Colors.primary}
                        name={playing ? 'play' : 'pause'}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </Text>
              </ImageBackground>
              <View style={styles.textContent}>
                <Text
                  numberOfLines={1}
                  style={[styles.wordbreak, styles.title]}
                >
                  {article.title}
                </Text>
                <View style={styles.wordbreak}>
                  <Text numberOfLines={3}>
                    {article.sections.map((s) => s.text).join('')}
                  </Text>
                </View>
                <View style={styles.action}>
                  <Text>
                    <FontAwesome5
                      name={'route'}
                      style={{ color: Colors.primary1 }}
                      size={18}
                    />{' '}
                    {formatDistance(article.distance, 1)}
                    <View style={{ width: 20 }}></View>
                    {article.voiceDurations ? (
                      <>
                        <FontAwesome5
                          name={'headset'}
                          style={{ color: Colors.primary1 }}
                          size={18}
                        />{' '}
                        {(article.voiceDurations.de / 60).toFixed(1)} min
                      </>
                    ) : (
                      <></>
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  marginRight: {
    marginRight: 10,
  },
  wordbreak: {
    backgroundColor: 'transparent',
    maxWidth: Dimensions.get('window').width - 140,
  },
  action: {
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  listItem: {
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  currentlyPlaying: {
    backgroundColor: 'transparent',
  },
  loading: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  textContent: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
