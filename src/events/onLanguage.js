import i18n from "../config/i18";
import { getLanguage, setLanguage } from "../utils/language";

export const changeLanguageHandler = async (ctx) => {
  try {
    const lang = ctx.match[0];
    const langActual = getLanguage(ctx);

    if (lang === langActual) return;

    setLanguage(ctx, lang);
    const message = i18n.t(`language.${lang}`);

    await ctx.reply(message);
  } catch (error) {
    console.error(error.message);
    ctx.reply("Error to change the language. Try again later.");
  }
};
