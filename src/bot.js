import { Telegraf } from "telegraf";
import { welcomeMessage } from "./commands/start";
import { showPokemon } from "./commands/pokemon";
import { howToUseBot } from "./commands/help";
import { showSetting } from "./commands/settings";
import dotenv from "dotenv";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(welcomeMessage);

bot.help(howToUseBot);

bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.settings(showSetting);

bot.command(["send"], (ctx) => ctx.reply("You send something"));

bot.command(["pokemon"], showPokemon);

bot.launch();
