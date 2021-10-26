import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articleReducer from './features/articles/articles.slice';
import synthesizerReducer from './features/synthesizer/synthesizer.slice';
import playerReducer from './features/player/player.slice';
import settingsReducer from './features/settings/settings.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'wtg',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  player: playerReducer,
  articles: articleReducer,
  synthesizer: synthesizerReducer,
  settings: settingsReducer,
});

//const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: rootReducer });
//export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
