import { Telegraf, session } from "telegraf";
import { welcomeMessage } from "./commands/start";
import {
  showPokemon,
  showGeneration,
  showRegion,
  showEntry,
} from "./commands/pokemon";
import { howToUseBot } from "./commands/help";
import { showSetting } from "./commands/settings";
import { entryPokemonHandler } from "./events/onText";
import { changeLanguageHandler } from "./events/onLanguage";
import { configEnvironment } from "./config/config";

const { token } = configEnvironment();
const bot = new Telegraf(token);

bot.use(session({ defaultSession: () => ({ language: "en" }) }));

bot.start(welcomeMessage);

bot.help(howToUseBot);

bot.settings(showSetting);

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("send", (ctx) => ctx.reply("You send something"));
bot.command(["pokemon", "pk", "pokemons"], showPokemon);
bot.command("generation", showGeneration);
bot.command("region", showRegion);
bot.command("entry", showEntry);

bot.on("sticker", (ctx) => ctx.reply("👍"));
// bot.on("callback_query", entryPokemonHandler);

bot.action("en", changeLanguageHandler);
bot.action("es", changeLanguageHandler);

bot.launch();
