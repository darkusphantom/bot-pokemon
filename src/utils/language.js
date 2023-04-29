import i18n from "../config/i18";

/**
 *  Change the language actual
 *
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @param {string} - Language to change
 */
export const setLanguage = (ctx, language) => {
  ctx.session.language = language;
  i18n.changeLanguage(language);
};

/**
 * Get the language actual
 *
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {string} - Language actual
 */
export const getLanguage = (ctx) => {
  return ctx.session.language || "en";
};
