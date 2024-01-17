import { Context } from "telegraf";
import { translate } from "../config/i18n";

/**
 * Displays in the chat information about how to use the bot and available commands.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
const howToUseBot = async (ctx: Context) => {
    try {
        const message =
            `${translate("command.how_to_use")}\n\n` +
            `${translate("command.start")}\n` +
            `${translate("command.help")}\n` +
            `${translate("command.setting")}\n\n` +
            `${translate("command.pokemon")}\n` +
            `${translate("command.generation")}\n\n` +
            `${translate("command.region")}\n\n` +
            `${translate("command.entry")}\n\n`;

        await ctx.reply(message);
    } catch (error: any) {
        console.error(error.name, error.message);
        await ctx.reply(translate("error.default"));
    }
};

export { howToUseBot }