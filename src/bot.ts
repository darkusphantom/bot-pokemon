import { Context, Telegraf, session } from 'telegraf';
import { howToUseBot, showEntry, showGeneration, showPokemon, showRegion, showSetting, welcomeMessage } from './commands';
import { changeLanguageHandler, entryPokemonHandler } from './events';
import { configEnvironment } from './config';

const { token: TOKEN } = configEnvironment();
const bot = new Telegraf(TOKEN);

const sessionConfig = session({
    defaultSession: () => ({ language: "en" })
})
bot.use(sessionConfig);

bot.start(welcomeMessage);
bot.help(howToUseBot);

bot.settings(showSetting);

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("send", (ctx: Context) => {
    ctx.reply("You send something");
});
bot.command(["pokemon", "pk", "pokemons"], showPokemon);
bot.command("generation", showGeneration);
bot.command("region", showRegion);
bot.command("entry", showEntry);

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.action(/entry_.+/, entryPokemonHandler);
bot.action("lang_en", changeLanguageHandler);
bot.action("lang_es", changeLanguageHandler);

export { bot }
