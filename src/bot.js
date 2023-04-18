import { Telegraf } from "telegraf";
import { welcomeMessage } from "./commands/start";
import { showPokemon } from "./commands/pokemon";

const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => welcomeMessage(ctx));

bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.settings((ctx) => ctx.reply("Settings"));

bot.command(["send"], (ctx) => ctx.reply("You send something"));

bot.command(["pokemon"], async (ctx) => {
  const pokemonId = ctx.message.text;
  const pokemon = await showPokemon(pokemonId);
  const message =
    `ID: ${pokemon.id}\n` +
    `Pokemon: ${pokemon.name}\n` +
    `Type: ${pokemon.types}`;

  ctx.reply(message);
});

bot.launch();
