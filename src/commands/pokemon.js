import i18n from "../config/i18";
import {
  getPokemon,
  getGeneration,
  getRegion,
  getEntries,
} from "../service/pokemon";
import {
  capitalize,
  divideArray,
  getTextFromCommand,
} from "../utils/format-words";
import { keyboardGames } from "../utils/keyboard";
import { getLanguage } from "../utils/language";

/**
 * Displays the information of the Pokémon provided in the chat.
 *
 * @async
 * @param {Telegraf:Context} ctx - The context of the conversation in which the Pokémon information is being displayed.
 * @returns {Promise<void>} A promise that is resolved once the Pokémon information has been displayed in the chat.
 */
export const showPokemon = async (ctx) => {
  try {
    const pokemonId = getTextFromCommand(ctx.message.text);
    const pokemon = await getPokemon(pokemonId);
    const height = pokemon.height / 10;

    if (!pokemon) return;

    const message =
      `${i18n.t("pokemon.pokedex_national")}: ${pokemon.id}\n` +
      `Pokemon: ${pokemon.name}\n` +
      `${i18n.t("pokemon.region")}: ${pokemon.region}\n` +
      `${i18n.t("pokemon.type")}: ${pokemon.types}\n` +
      `${i18n.t("pokemon.abilities")}: ${pokemon.abilities}\n` +
      `${i18n.t("pokemon.height")}: ${height}m\n`;

    await ctx.replyWithPhoto(pokemon.sprite, { caption: message });
  } catch (error) {
    console.error(error.name, error.message);
    if (error.name === "TypeError") {
      await ctx.reply(i18n.t("error.pokemon_doesnt_exist"));
    }
  }
};

/**
 * Displays the information of the Generation provided in the chat.
 *
 * @async
 * @param {Telegraf:Context} ctx - The context of the conversation in which the Pokémon information is being displayed.
 * @returns {Promise<void>} A promise that is resolved once the Generation information has been displayed in the chat.
 */
export const showGeneration = async (ctx) => {
  try {
    const id = getTextFromCommand(ctx.message.text);
    const generation = await getGeneration(id);

    if (!generation) return;

    const message =
      `${i18n.t("pokemon.generation")} N°: ${generation.id}\n` +
      `${i18n.t("pokemon.region")}: ${generation.region}\n` +
      `${i18n.t("pokemon.new_pokemon")}: ${generation.totalNewPokemon}\n` +
      `${i18n.t("pokemon.new_pokemon_types")}: ${generation.totalNewTypes}\n` +
      `${i18n.t("pokemon.games")}: ${generation.games}\n`;

    await ctx.replyWithPhoto(generation.src, {
      caption: message,
    });
  } catch (error) {
    console.error(error.name, error.message);
    if (error.name === "TypeError") {
      await ctx.reply(i18n.t("error.generation"));
    }
  }
};

/**
 * Send the region Pokemon by name or id to the Telegram chat.
 *
 * @async
 * @param {Telegraf:Context} ctx - El objeto de contexto de Telegraf.
 * @returns {Promise<void>}
 */
export const showRegion = async (ctx) => {
  try {
    const id = getTextFromCommand(ctx.message.text);
    const region = await getRegion(id);

    const message =
      `${i18n.t("pokemon.region")}: ${region.name}\n` +
      `${i18n.t("pokemon.generation")}: ${region.generation}\n` +
      `${i18n.t("pokemon.total_places")}: ${region.totalLocalization}\n` +
      `${i18n.t("pokemon.appears_games")}: ${region.games}\n`;

    await ctx.reply(message);
  } catch (error) {
    console.error(error.name, error.message);
    if (error.name === "TypeError") {
      ctx.reply(i18n.t("error.generation"));
    }
  }
};

/**
 * Send the Pokédex entry for the specified Pokémon to the Telegram chat.
 *
 * @async
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {Promise<void>}
 */
export const showEntry = async (ctx) => {
  try {
    const pokemon = getTextFromCommand(ctx.message.text);
    const pokemonEntryData = await getEntries(pokemon);
    const pokemonData = await getPokemon(pokemon);
    const lang = getLanguage(ctx);

    if (!pokemonEntryData || !pokemonData) return;

    const games = pokemonEntryData.entries
      .filter((entry) => entry.language.name === lang)
      .map((entry) => entry.version.name);

    const gamesPokemon = divideArray(games);
    const pokemonEntry = pokemonEntryData.entries.find(
      (entry) => entry.language.name === lang
    );

    const pokemonGame = capitalize(pokemonEntry.version.name);
    const pokemonName = capitalize(pokemonEntryData.name);

    const keyboard = keyboardGames(gamesPokemon);
    const message =
      `${i18n.t("pokemon.entry_of")} ${pokemonName}` +
      `\n\nPokemon ${pokemonGame}:\n` +
      `${pokemonEntry.flavor_text}`;

    await ctx.replyWithPhoto(pokemonData.sprite);
    await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
  } catch (error) {
    console.error(error.name, error.message);

    if (error.name === "Error") {
      await ctx.reply(i18n.t("error.default"));
    }

    if (error.name === "TypeError") {
      await ctx.reply(i18n.t("error.entry"));
    }
  }
};
