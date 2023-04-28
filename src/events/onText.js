import { capitalize, divideArray } from "../utils/format-words";
import { keyboardGames } from "../utils/keyboard";
import { getEntries } from "../service/pokemon";

/**
 * Send the Pokedex Pokémon entry for a specified game.
 *
 * @async
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {Promise<void>}
 */
// export const entryPokemonHandler = async (ctx) => {
//   try {
//     const query = ctx.callbackQuery;
//     const game = query.data.substring(6);
//     const pokemon = query.message.text.split(" ")[2];
//     const pokemonData = await getEntries(pokemon.toLowerCase());

//     if (!pokemonData) return;

//     const games = pokemonData.entries
//       .filter((entry) => entry.language.name === "en")
//       .map((entry) => entry.version.name);

//     const pokemonEntry = pokemonData.entries.find(
//       (entry) => entry.version.name === game && entry.language.name === "en"
//     );

//     const gamesPokemon = divideArray(games);
//     const pokemonGame = capitalize(game);
//     const pokemonName = capitalize(pokemon);

//     const keyboard = keyboardGames(gamesPokemon);
//     const message = `Entry of ${pokemonName} in Pokemon ${pokemonGame}:\n\n${pokemonEntry.flavor_text}`;

//     await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
//   } catch (err) {
//     console.error(err.message);
//   }
// };
