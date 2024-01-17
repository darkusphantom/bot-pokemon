import { translate } from "../config";
import { getEntries } from "../service/pokemon";
import { capitalize, divideArray, getLanguage, keyboardGames } from "../utils";

/**
 * Send the Pokedex Pokémon entry for a specified game.
 *
 * @async
 * @param {Telegraf:Context} ctx - The Telegraf context object.
 * @returns {Promise<void>}
 */
export const entryPokemonHandler = async (ctx: any): Promise<void> => {
    try {
        const query = ctx.callbackQuery;
        const game = query.data.substring(6);
        const pokemon = query.message.text.split(" ")[2].split(/\n\nPokemon/)[0];
        const pokemonData = await getEntries(pokemon);
        const lang = getLanguage(ctx);

        if (!pokemonData) return;

        const games = pokemonData.entries
            .filter((entry: any) => entry.language.name === lang)
            .map((entry: any) => entry.version.name);

        const pokemonEntry = pokemonData.entries.find(
            (entry: any) => entry.version.name === game && entry.language.name === lang
        );

        const gamesPokemon = divideArray(games);
        const pokemonGame = capitalize(game);
        const pokemonName = capitalize(pokemon);

        const keyboard = keyboardGames(gamesPokemon);
        const message =
            `${translate("pokemon.entry_of")} ${pokemonName}\n\n` +
            `Pokemon ${pokemonGame}:\n` +
            `${pokemonEntry.flavor_text}`;

        await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
    } catch (error: any) {
        console.error(error.message);

        if (error.name === "Error") {
            await ctx.reply(translate("error.default"));
        }

        if (error.name === "TypeError") {
            await ctx.reply(translate("error.entry"));
        }
    }
};
