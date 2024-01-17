// import i18n from "../config/i18";

import { Context } from "telegraf";
import { translate } from "../config/i18n";
import { errorHandlerMessage } from "../client/errorHandler";


/**
 * Displays in the chat information about the settings.
 *
 * @param {Context} ctx - The context of the conversation in which the information is being displayed.
 */
const welcomeMessage = async (ctx: Context) => {
    try {
        const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;
        const init =
            translate("start.init") +
            `, ${username}\n` +
            `${translate("start.pokedex")}\n\n`;
        const message =
            `${translate("command.how_to_use")}\n\n` +
            `${translate("command.start")}\n` +
            `${translate("command.help")}\n` +
            `${translate("command.setting")}\n\n` +
            `${translate("command.pokemon")}\n` +
            `${translate("start.help_commands")}\n`;

        await ctx.reply(init + message);
    } catch (error: unknown) {
        const messageError = errorHandlerMessage(error, "error.default");
        await ctx.reply(messageError);
    }
};

export { welcomeMessage };