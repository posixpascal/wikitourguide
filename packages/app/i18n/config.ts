import i18n from 'i18next';
import translation from './de';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

export const resources = {
  de: {
    translation,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: Localization.locale,
  resources,
});
