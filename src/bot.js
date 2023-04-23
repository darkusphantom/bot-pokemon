import { Telegraf } from "telegraf";
import { welcomeMessage } from "./commands/start";
import { showPokemon, showGeneration, showRegion } from "./commands/pokemon";
import { howToUseBot } from "./commands/help";
import { showSetting } from "./commands/settings";
import { configEnvironment } from "./config/config";

const { token } = configEnvironment();
const bot = new Telegraf(token);

bot.start(welcomeMessage);

bot.help(howToUseBot);

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.settings(showSetting);

bot.command(["send"], (ctx) => ctx.reply("You send something"));

bot.command(["pokemon", "pk", "pokemons"], showPokemon);

bot.command("generation", showGeneration);

bot.command("region", showRegion);

bot.launch();
