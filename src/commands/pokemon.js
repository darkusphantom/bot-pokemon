import { getPokemon } from "../utils/pokemon";
import { deleteSpace } from "../utils/format-words";

/**
 * Show the pokemon called it
 * @param {Object} ctx
 */
export const showPokemon = async (ctx) => {
  try {
    const { text } = ctx.message;
    const indexData = text.indexOf(" ");
    const pokemonId = deleteSpace(text.slice(indexData, text.length));
    const pokemon = await getPokemon(pokemonId);

    if (!pokemon) return;

    const message =
      `Pokedex National: ${pokemon.id}\n` +
      `Pokemon: ${pokemon.name}\n` +
      `Type: ${pokemon.types}\n` +
      `Abilities: ${pokemon.abilities}\n` +
      `Height: ${pokemon.height}\n`;

    await ctx.replyWithPhoto({ url: pokemon.sprite, caption: message });
    await ctx.reply(message);
  } catch (error) {
    console.error(error.message);
    ctx.reply("The pokemon doesn't exist");
  }
};
