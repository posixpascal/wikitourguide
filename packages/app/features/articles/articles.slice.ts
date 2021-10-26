import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import { API_URL } from '../../config';
import { Article } from './article';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

interface ArticlesState {
  articles: Article[];
  currentArticle: Article;

  loading: boolean;
  loadingImage: boolean;
  playedArticleIds: string[];
  read: boolean;
  apiUnavailable: boolean;
  playing: boolean;
}

const initialState: ArticlesState = {
  playing: false,
  currentArticle: null,
  loading: false,
  loadingImage: false,
  articles: [],
  playedArticleIds: [],
  read: false,
  apiUnavailable: false,
};

export const fetchNearbyArticles = createAsyncThunk(
  'articles/fetchNearbyArticles',
  async () => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(
      `${API_URL}/wikipedia/coords?lat=${latitude}&lng=${longitude}&limit=10`,
    );
    const { data } = await axios.get(
      `${API_URL}/wikipedia/coords?lat=${latitude}&lng=${longitude}&limit=10`,
      {
        timeout: 7000,
      },
    );

    return data;
  },
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    play(state, action) {
      state.playing = action.payload;
    },
    toggle(state) {
      state.playing = !state.playing;
    },
    next(state) {
      const index = state.articles.findIndex(
        (a) => a.pageID === state.currentArticle.pageID,
      );
      if (index < state.articles.length - 1) {
        state.currentArticle = state.articles[index + 1];
      } else {
        state.currentArticle = state.articles[0];
      }
    },
    prev(state) {
      const index = state.articles.findIndex(
        (a) => a.pageID === state.currentArticle.pageID,
      );
      if (index > 0) {
        state.currentArticle = state.articles[index - 1];
      } else {
        state.currentArticle = state.articles[state.articles.length - 1];
      }
    },
    setActive(state, action) {
      state.currentArticle = action.payload;
    },
    markRead(state, action) {
      state.articles = state.articles.map((article) => {
        if (article.pageID === action.payload.pageID) {
          article.read = true;
        }
        return article;
      });

      AsyncStorage.getItem('read-articles').then((arts) => {
        const count = parseInt(arts || '0');
        AsyncStorage.setItem('read-articles', String(count + 1));
        if (count === 10) {
          StoreReview.requestReview();
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNearbyArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNearbyArticles.fulfilled, (state, action: any) => {
      state.apiUnavailable = false;
      state.loading = false;
      state.articles = [
        ...state.articles.map((a: Article) => {
          const hasUpdate = action.payload.find(
            (b: Article) => b.pageID == a.pageID,
          );
          if (hasUpdate) {
            return { ...a, ...hasUpdate };
          }
          return a;
        }),
        ...action.payload.filter(
          (a: Article) =>
            !state.articles.find((b: Article) => a.pageID == b.pageID),
        ),
      ].sort((a, b) => {
        if (a.distance > b.distance) {
          return 1;
        }

        if (b.distance > a.distance) {
          return -1;
        }

        return 0;
      });

      if (state.currentArticle === null) {
        state.currentArticle = state.articles[0];
      }
    });
    builder.addCase(fetchNearbyArticles.rejected, (state, err) => {
      console.log('Retrying', err);
      state.apiUnavailable = true;
    });
  },
});

export const { play, enhancing, markRead, setActive, toggle, next, prev }: any =
  articleSlice.actions;
export default articleSlice.reducer;
