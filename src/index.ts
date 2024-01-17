import { Telegraf, session } from 'telegraf';

import { howToUseBot, welcomeMessage } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { configEnvironment } from './config/enviroment';

const { token: TOKEN, environment: ENVIRONMENT } = configEnvironment();
const bot = new Telegraf(TOKEN);

bot.use(session({ defaultSession: () => ({ language: "en" }) }));

bot.start(welcomeMessage);
bot.help(howToUseBot);

// bot.settings(showSetting);

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

// bot.command("send", (ctx) => ctx.reply("You send something"));
// bot.command(["pokemon", "pk", "pokemons"], showPokemon);
// bot.command("generation", showGeneration);
// bot.command("region", showRegion);
// bot.command("entry", showEntry);

bot.on("sticker", (ctx) => ctx.reply("👍"));

// bot.action(/entry_.+/, entryPokemonHandler);
// bot.action("lang_en", changeLanguageHandler);
// bot.action("lang_es", changeLanguageHandler);



//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
