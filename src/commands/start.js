export const welcomeMessage = (ctx) => {
  ctx.reply(`Welcome to the Bot, ${ctx.from.first_name} ${ctx.from.last_name}`);
};
