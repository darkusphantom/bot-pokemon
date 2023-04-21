import { getPokemon, getGeneration } from "../utils/pokemon";
import { deleteSpace } from "../utils/format-words";

/**
 * Displays the information of the Pokémon provided in the chat.
 *
 * @async
 * @param {object} ctx - The context of the conversation in which the Pokémon information is being displayed.
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

    await ctx.replyWithPhoto({ url: pokemon.sprite, caption: message });
    await ctx.reply(message);
  } catch (error) {
    console.error(error.message);
    ctx.reply("The pokemon doesn't exist");
  }
};

/**
 * Displays the information of the Generation provided in the chat.
 *
 * @async
 * @param {object} ctx - The context of the conversation in which the Pokémon information is being displayed.
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

    await ctx.replyWithPhoto({ url: generation.src, caption: message });
    await ctx.reply(message);
  } catch (error) {
    console.error(error.message);
    ctx.reply("The region doesn't exist");
  }
};

export const showRegion = async (ctx) => {
  try {
    const id = getTextFromCommand(ctx.message.text);
    const generation = await getGeneration(id);

    await ctx.reply();
  } catch (error) {
    console.error(error);
  }
};
