/* eslint-disable camelcase */
import i18n from "i18next";
import common_en from "../translations/en.json";
import common_es from "../translations/es.json";

/**
 * Object that stores the translation resources for each language.
 */
const resources = {
  en: {
    translation: common_en,
  },
  es: {
    translation: common_es,
  },
};

/**
 * i18n configuration for the application.
 */
i18n.init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
