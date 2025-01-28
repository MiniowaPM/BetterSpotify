import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/router";
import { createI18n } from "vue-i18n";

import en from './locales/en.json';
import pl from './locales/pl.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  },
});

createApp(App)
  .use(Router)
  .use(i18n)
  .mount("#app");