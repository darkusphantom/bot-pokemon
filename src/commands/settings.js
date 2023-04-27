import i18n from "../config/i18";
import { keyboardLanguage } from "../utils/keyboard";

/**
 * Displays in the chat information about the settings.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const showSetting = async (ctx) => {
  try {
    const keyboard = keyboardLanguage();
    const message = i18n.t("settings.lang");

    await ctx.reply(message, keyboard);
  } catch (error) {
    console.error(error.message);
  }
};
