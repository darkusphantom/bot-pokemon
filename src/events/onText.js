import { capitalize, divideArray } from "../utils/format-words";
import { keyboardGames } from "../utils/keyboard";
import { getEntries } from "../service/pokemon";
import { getLanguage } from "../utils/language";
import i18n from "../config/i18";

/**
 * Send the Pokedex Pokémon entry for a specified game.
 *
 * @async
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {Promise<void>}
 */
export const entryPokemonHandler = async (ctx) => {
  try {
    const query = ctx.callbackQuery;
    const game = query.data.substring(6);
    const pokemon = query.message.text.split(" ")[2].split(/\n\nPokemon/)[0];
    const pokemonData = await getEntries(pokemon);
    const lang = getLanguage(ctx);

    if (!pokemonData) return;

    const games = pokemonData.entries
      .filter((entry) => entry.language.name === lang)
      .map((entry) => entry.version.name);

    const pokemonEntry = pokemonData.entries.find(
      (entry) => entry.version.name === game && entry.language.name === lang
    );

    const gamesPokemon = divideArray(games);
    const pokemonGame = capitalize(game);
    const pokemonName = capitalize(pokemon);

    const keyboard = keyboardGames(gamesPokemon);
    const message =
      `${i18n.t("pokemon.entry_of")} ${pokemonName}\n\n` +
      `Pokemon ${pokemonGame}:\n` +
      `${pokemonEntry.flavor_text}`;

    await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
  } catch (error) {
    console.error(error.message);

    if (error.name === "Error") {
      await ctx.reply(i18n.t("error.default"));
    }

    if (error.name === "TypeError") {
      await ctx.reply(i18n.t("error.entry"));
    }
  }
};
