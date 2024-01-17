/* eslint-disable camelcase */
const i18n = require("i18next");
const common_en = require("../translations/en.json");
const common_es = require("../translations/es.json");

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

const translate = i18n.t

const changeLanguage = i18n.changeLanguage

export { i18n, translate, changeLanguage };
