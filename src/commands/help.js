/**
 * Displays in the chat information about how to use the bot and available commands.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const howToUseBot = (ctx) => {
  ctx.reply(`How to use me? This is my commands:
--------------------------------------------
/start - show the welcome message
/pokemon + name or ID - The pokemon to see. Example: /pokemon pikachu
/generation + (1-9) - The generation to see. Example: /generation 4
/help - show the commands available`);
};
