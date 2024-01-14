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

bot.action(/entry_.+/, entryPokemonHandler);
bot.action("lang_en", changeLanguageHandler);
bot.action("lang_es", changeLanguageHandler);

bot.launch();

// prod mode (Vercel)
export const startVercel = async (req, res) => {
  await production(req, res, bot);
};
