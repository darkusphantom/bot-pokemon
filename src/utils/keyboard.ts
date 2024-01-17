import { Markup } from "telegraf";

/**
 * Creates an inline keyboard with two buttons to select a language.
 *
 * @returns {Markup} - Inline keyboard with two buttons to select a language.
 */
export const keyboardLanguage = () =>
    Markup.inlineKeyboard([
        Markup.button.callback("EN", "lang_en"),
        Markup.button.callback("ES", "lang_es"),
    ]);

/**
 * Creates an inline keyboard with the games to select a entry pokemon.
 *
 * @returns {Markup} - Inline keyboard with two buttons to select a game.
 */
export const keyboardGames = (games: any[]): any => {
    const buttons = games.map((gameByNames: any) =>
        gameByNames.map((game: any) => Markup.button.callback(game, `entry_${game}`))
    );

    return Markup.inlineKeyboard(buttons);
};
