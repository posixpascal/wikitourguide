import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import './i18n/config';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';
import { ColorScheme } from './components/ColorScheme';
import { Synthesizer } from './components/Synthesizer';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Synthesizer />
          <ColorScheme>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ColorScheme>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

serviceWorkerRegistration.register();
