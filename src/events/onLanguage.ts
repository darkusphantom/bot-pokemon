import { translate } from "../config";
import { getLanguage, setLanguage } from "../utils";

/**
 * Change the language
 *
 * Available languages: ES, ENG
 *
 * @async
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {Promise<void>}
 */
export const changeLanguageHandler = async (ctx: any): Promise<void> => {
    try {
        const lang = ctx.match[0].substring(5);
        const langActual = getLanguage(ctx);

        if (lang === langActual) return;

        setLanguage(ctx, lang);
        const message = translate(`language.${lang}`);

        await ctx.reply(message);
    } catch (error: any) {
        console.error(error.message);
        ctx.reply(translate("error.language"));
    }
};
