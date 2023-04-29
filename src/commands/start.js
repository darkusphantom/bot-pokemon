import i18n from "../config/i18";

/**
 * Displays in the chat information about the settings.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const welcomeMessage = async (ctx) => {
  try {
    const init =
      i18n.t("start.init") +
      `, ${ctx.from.first_name} ${ctx.from.last_name}\n` +
      `${i18n.t("start.pokedex")}\n\n`;
    const message =
      `${i18n.t("command.how_to_use")}\n\n` +
      `${i18n.t("command.start")}\n` +
      `${i18n.t("command.help")}\n` +
      `${i18n.t("command.setting")}\n\n` +
      `${i18n.t("command.pokemon")}\n` +
      `${i18n.t("start.help_commands")}\n`;

    await ctx.reply(init + message);
  } catch (error) {
    console.error(error.message);
  }
};
