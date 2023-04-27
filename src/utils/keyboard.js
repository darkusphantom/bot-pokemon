import { Markup } from "telegraf";

export const keyboardLanguage = (language) =>
  Markup.inlineKeyboard([
    Markup.button.callback("EN", "en"),
    Markup.button.callback("ES", "es"),
  ]);

export const keyboardGames = (games) => {
  const buttons = games.map((gameByNames) =>
    gameByNames.map((game) => Markup.button.callback(game, `entry_${game}`))
  );

  return Markup.inlineKeyboard(buttons);
};
