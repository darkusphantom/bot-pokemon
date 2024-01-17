import { Context } from "telegraf";
import { translate } from "../config";
import { getLanguage, keyboardLanguage } from "../utils";
import { errorHandlerMessage } from "../client/errorHandler";


/**
 * Displays in the chat information about the settings.
 *
 * @param {Context} ctx - The context of the conversation in which the information is being displayed.
 */
export const showSetting = async (ctx: Context) => {
    try {
        const keyboard = keyboardLanguage();
        const lang = getLanguage(ctx).toUpperCase();
        const message = `${translate("settings.lang")} ${lang}`;
        await ctx.reply(message, keyboard);
    } catch (error: unknown) {
        const messageError = errorHandlerMessage(error, "error.default");
        await ctx.reply(messageError);
    }
};
