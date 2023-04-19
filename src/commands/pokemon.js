import { getPokemon } from "../utils/pokemon";

/**
 * Show the pokemon called it
 * @param {Object} ctx
 */
export const showPokemon = async (ctx) => {
  try {
    const pokemonId = ctx.message.text;
    const pokemon = await getPokemon(pokemonId);

    if (!pokemon) return;

    const message =
      `ID: ${pokemon.id}\n` +
      `Pokemon: ${pokemon.name}\n` +
      `Type: ${pokemon.types}`;

    ctx.reply(message);
  } catch (error) {
    console.error(error.message);
    ctx.reply("The pokemon doesn't exist");
  }
};
