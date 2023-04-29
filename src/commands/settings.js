import i18n from "../config/i18";
import { keyboardLanguage } from "../utils/keyboard";
import { getLanguage } from "../utils/language";

/**
 * Displays in the chat information about the settings.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const showSetting = async (ctx) => {
  try {
    const keyboard = keyboardLanguage();
    const lang = getLanguage(ctx).toUpperCase();
    const message = `${i18n.t("settings.lang")} ${lang}`;

    await ctx.reply(message, keyboard);
  } catch (error) {
    console.error(error.message);
    await ctx.reply(i18n.t("error.default"));
  }
};
