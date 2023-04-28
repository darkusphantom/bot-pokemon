/**
 * Displays in the chat information about how to use the bot and available commands.
 *
 * @param {object} ctx - The context of the conversation in which the information is being displayed.
 */
export const howToUseBot = async (ctx) => {
  try {
    await ctx.reply(`How to use me? This is my commands:
    --------------------------------------------
    /start - show the welcome message
    
    /pokemon + name or ID - The pokemon to see.
    Example: /pokemon pikachu
    Example2: /pokemon 25
    
    /generation + (1-9) - The generation to see.
    Example: /generation 4
    
    /region + (1-9) - The region to see.
    Example: /region 4
    
    /entry + name or ID - The entry pokemon.
    Example /entry bulbasaur
    
    /help - show the commands available`);
  } catch (error) {
    console.error(error.name, error.message);
    await ctx.reply("An error occurred");
  }
};
