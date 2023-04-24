import { Telegraf } from "telegraf";
import { welcomeMessage } from "./commands/start";
import {
  showPokemon,
  showGeneration,
  showRegion,
  showEntry,
  showEntryByLanguage,
} from "./commands/pokemon";
import { howToUseBot } from "./commands/help";
import { showSetting } from "./commands/settings";
import { entryPokemonHandler } from "./events/onText";
import { configEnvironment } from "./config/config";
import { pokemonGames } from "./utils/const";

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

bot.command("entry", showEntry);

bot.action("en", showEntryByLanguage("EN"));
bot.action("es", showEntryByLanguage("ES"));

bot.on("callback_query", entryPokemonHandler);

// bot.context.welcomeMessage((ctx) => ctx.reply("Welcome"));

bot.launch();
