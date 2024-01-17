// import i18n from "../config/i18";

import { Context } from "telegraf";
import { i18n } from "../config";


/**
 * Displays in the chat information about the settings.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
const welcomeMessage = async (ctx: Context) => {
    try {
        const username = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;
        const init =
            i18n.t("start.init") +
            `, ${username}\n` +
            `${i18n.t("start.pokedex")}\n\n`;
        const message =
            `${i18n.t("command.how_to_use")}\n\n` +
            `${i18n.t("command.start")}\n` +
            `${i18n.t("command.help")}\n` +
            `${i18n.t("command.setting")}\n\n` +
            `${i18n.t("command.pokemon")}\n` +
            `${i18n.t("start.help_commands")}\n`;

        await ctx.reply(init + message);
    } catch (error: any) {
        console.error(error.message);
    }
};

export { welcomeMessage };