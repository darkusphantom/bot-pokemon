export const welcomeMessage = (ctx) => {
  ctx.reply(`Welcome to the Bot, ${ctx.from.first_name} ${ctx.from.last_name}
I am the Pokedex and i will be your tool.

How to use me?
--------------------------------------------
This is my commands:
- /start - show the welcome message
- /help - show the commands available
- /pokemon + name or ID - The pokemon to see. Example: /pokemon pikachu`);
};
