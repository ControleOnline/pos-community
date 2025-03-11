import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "pt-br",
  fallbackLocale: "en-us",
  globalInjection: true,
  messages: {},
});

export default boot(({ app }) => {
  app.use(i18n);
});
