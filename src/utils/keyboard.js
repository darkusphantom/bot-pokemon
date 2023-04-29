import { Markup } from "telegraf";

export const keyboardLanguage = () =>
  Markup.inlineKeyboard([
    Markup.button.callback("EN", "lang_en"),
    Markup.button.callback("ES", "lang_es"),
  ]);

export const keyboardGames = (games) => {
  const buttons = games.map((gameByNames) =>
    gameByNames.map((game) => Markup.button.callback(game, `entry_${game}`))
  );

  return Markup.inlineKeyboard(buttons);
};
