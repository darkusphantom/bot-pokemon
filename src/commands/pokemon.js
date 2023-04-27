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

    if (!pokemon) return;

    const message =
      `Pokedex National: ${pokemon.id}\n` +
      `Pokemon: ${pokemon.name}\n` +
      `Region: ${pokemon.region}\n` +
      `Type: ${pokemon.types}\n` +
      `Abilities: ${pokemon.abilities}\n` +
      `Height: ${pokemon.height}dm\n`;

    await ctx.replyWithPhoto(pokemon.sprite, { caption: message });
  } catch (error) {
    console.error(error.message);
    ctx.reply("The pokemon doesn't exist. Try by the ID pokemon");
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
      `Generation N°: ${generation.id}\n` +
      `Name Region: ${generation.region}\n` +
      `New Pokemon: ${generation.totalNewPokemon}\n` +
      `New Pokemon Types: ${generation.totalNewTypes}\n` +
      `Games: ${generation.games}\n`;

    await ctx.replyWithPhoto(generation.src, {
      caption: message,
    });
  } catch (error) {
    console.error(error.message);
    ctx.reply("The generation doesn't exist");
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
      `Region: ${region.name}\n` +
      `Generation: ${region.generation}\n` +
      `Total places: ${region.totalLocalization}\n` +
      `Appears games: ${region.games}\n`;

    await ctx.reply(message);
  } catch (error) {
    console.error(error);
    ctx.reply("The region doesn't exist");
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

    if (!pokemonEntryData || !pokemonData) return;

    const games = pokemonEntryData.entries
      .filter((entry) => entry.language.name === "en")
      .map((entry) => entry.version.name);
    const gamesPokemon = divideArray(games);
    const pokemonEntry = pokemonEntryData.entries.find(
      (entry) => entry.language.name === "en"
    );
    const pokemonGame = capitalize(pokemonEntry.version.name);
    const pokemonName = capitalize(pokemonEntryData.name);

    const keyboard = keyboardGames(gamesPokemon);
    const message = `Entry of ${pokemonName} in Pokemon ${pokemonGame}:\n\n${pokemonEntry.flavor_text}`;

    await ctx.replyWithPhoto(pokemonData.sprite, {
      caption: message,
      reply_markup: keyboard,
    });
    // await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
  } catch (error) {
    console.error(error);
    ctx.reply("The pokemon entry doesn't exist. Try by the ID pokemon");
  }
};

// export const showEntryByLanguage = async (languageSelected) => {
// const pokemon = getTextFromCommand(ctx.message.text);
// const pokemonEntries = await getEntries(pokemon);
// if (!pokemonEntries) return;
// const languagesNames = pokemonEntries.map((entry) => entry.language.name);
// const languages = Array.from(new Set(languagesNames)).sort();
// const languagesBtn = languages.map((language) => [
//   Markup.button.callback(language, language),
// ]);
// ctx.telegram.sendMessage(ctx.chat.id, "Elige un idioma", keyboard);
// };
