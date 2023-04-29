import i18n from "../config/i18";

/**
 * Displays in the chat information about how to use the bot and available commands.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const howToUseBot = async (ctx) => {
  try {
    const message =
      `${i18n.t("command.how_to_use")}\n\n` +
      `${i18n.t("command.start")}\n` +
      `${i18n.t("command.help")}\n` +
      `${i18n.t("command.setting")}\n\n` +
      `${i18n.t("command.pokemon")}\n` +
      `${i18n.t("command.generation")}\n\n` +
      `${i18n.t("command.region")}\n\n` +
      `${i18n.t("command.entry")}\n\n`;

    await ctx.reply(message);
  } catch (error) {
    console.error(error.name, error.message);
    await ctx.reply(i18n.t("error.default"));
  }
};
