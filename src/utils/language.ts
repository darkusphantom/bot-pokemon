import { i18n } from "../config/i18n";

/**
 *  Change the language actual
 *
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @param {string} - Language to change
 */
const setLanguage = (ctx: any, language: string) => {
    ctx.session.language = language;
    i18n.changeLanguage(language);
};

/**
 * Get the language actual
 *
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {string} - Language actual
 */
const getLanguage = (ctx: any) => {
    return ctx.session.language || "en";
};

export {
    setLanguage,
    getLanguage
}