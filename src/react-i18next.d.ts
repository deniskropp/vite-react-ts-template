// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import zh from '@/i18n/locales/zh';
import en from '@/i18n/locales/en';

type I18nNamespace = typeof zh | typeof en;

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      zh : I18nNamespace
      en: I18nNamespace
    }
  }
}
