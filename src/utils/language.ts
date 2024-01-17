import { changeLanguage } from "../config/i18n";

/**
 *  Change the language actual
 *
 * @param {Context} ctx - The Telegraf context object.
 * @param {string}  language - Language to change
 */
const setLanguage = (ctx: any, language: string) => {
    ctx.session.language = language;
    changeLanguage(language);
};

/**
 * Get the language actual
 *
 * @param {Context} ctx - The Telegraf context object.
 * @returns {string} - Language actual
 */
const getLanguage = (ctx: any): string => {
    return ctx.session.language || "en";
};

export {
    setLanguage,
    getLanguage
}