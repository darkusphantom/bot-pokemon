/**
 * Displays in the chat information about the settings.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const welcomeMessage = (ctx) => {
  const message = `Welcome to the Bot, ${ctx.from.first_name} ${ctx.from.last_name}
  I am the Pokedex and i will be your tool.
  
  How to use me?
  --------------------------------------------
  This is my commands:
  /start - show the welcome message
  /help - show the commands available
  /pokemon + name or ID - The pokemon to see. Example: /pokemon pikachu
  
  Try to use /help to see all commands`;

  ctx.reply(message);
};
