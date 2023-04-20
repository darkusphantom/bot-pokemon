export const listenExample = (ctx) => {
  console.log(
    "El usuario",
    ctx.from.username,
    "envió un mensaje:",
    ctx.message.text
  );
  ctx.reply("¡Gracias por tu mensaje!");
};

export const sendShowPokemon = (ctx) => {
  ctx.reply("Send the name of the pokemon");
};
