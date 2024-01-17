import {
    capitalize,
    divideArray,
    getTextFromCommand,
} from "../utils/format-words";
import { keyboardGames } from "../utils/keyboard";
import { getLanguage } from "../utils/language";
import { translate } from "../config";
import { getEntries, getGeneration, getPokemon, getRegion } from "../service/pokemon";

/**
 * Displays the information of the Pokémon provided in the chat.
 *
 * @async
 * @param {Telegraf:Context} ctx - The context of the conversation in which the Pokémon information is being displayed.
 * @returns {Promise<void>} A promise that is resolved once the Pokémon information has been displayed in the chat.
 */
const showPokemon = async (ctx: any): Promise<void> => {
    try {
        const pokemonId = getTextFromCommand(ctx.message?.text);
        const pokemon = await getPokemon(pokemonId);

        if (!pokemon) return;

        const height = pokemon.height / 10;


        const message =
            `${translate("pokemon.pokedex_national")}: ${pokemon.id}\n` +
            `Pokemon: ${pokemon.name}\n` +
            `${translate("pokemon.region")}: ${pokemon.region}\n` +
            `${translate("pokemon.type")}: ${pokemon.types}\n` +
            `${translate("pokemon.abilities")}: ${pokemon.abilities}\n` +
            `${translate("pokemon.height")}: ${height}m\n`;

        await ctx.replyWithPhoto(pokemon.sprite, { caption: message });
    } catch (error: any) {
        console.error(error.name, error.message);
        if (error.name === "TypeError") {
            await ctx.reply(translate("error.pokemon_doesnt_exist"));
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
const showGeneration = async (ctx: any): Promise<void> => {
    try {
        const id = getTextFromCommand(ctx.message.text);
        const generation = await getGeneration(Number(id));

        if (!generation) return;

        const message =
            `${translate("pokemon.generation")} N°: ${generation.id}\n` +
            `${translate("pokemon.region")}: ${generation.region}\n` +
            `${translate("pokemon.new_pokemon")}: ${generation.totalNewPokemon}\n` +
            `${translate("pokemon.new_pokemon_types")}: ${generation.totalNewTypes}\n` +
            `${translate("pokemon.games")}: ${generation.games}\n`;

        await ctx.replyWithPhoto(generation.src, {
            caption: message,
        });
    } catch (error: any) {
        console.error(error.name, error.message);
        if (error.name === "TypeError") {
            await ctx.reply(translate("error.generation"));
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
const showRegion = async (ctx: any): Promise<void> => {
    try {
        const id = getTextFromCommand(ctx.message.text);
        const region = await getRegion(id);

        const message =
            `${translate("pokemon.region")}: ${region.name}\n` +
            `${translate("pokemon.generation")}: ${region.generation}\n` +
            `${translate("pokemon.total_places")}: ${region.totalLocalization}\n` +
            `${translate("pokemon.appears_games")}: ${region.games}\n`;

        await ctx.reply(message);
    } catch (error: any) {
        console.error(error.name, error.message);
        if (error.name === "TypeError") {
            ctx.reply(translate("error.generation"));
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
const showEntry = async (ctx: any): Promise<void> => {
    try {
        const pokemon = getTextFromCommand(ctx.message.text);
        const pokemonEntryData = await getEntries(pokemon);
        const pokemonData = await getPokemon(pokemon);
        const lang = getLanguage(ctx);

        if (!pokemonEntryData || !pokemonData) return;

        const games = pokemonEntryData.entries
            .filter((entry: any) => entry.language.name === lang)
            .map((entry: any) => entry.version.name);

        const gamesPokemon = divideArray(games);
        const pokemonEntry = pokemonEntryData.entries.find(
            (entry: any) => entry.language.name === lang
        );

        const pokemonGame = capitalize(pokemonEntry.version.name);
        const pokemonName = capitalize(pokemonEntryData.name);

        const keyboard = keyboardGames(gamesPokemon);
        const message =
            `${translate("pokemon.entry_of")} ${pokemonName}` +
            `\n\nPokemon ${pokemonGame}:\n` +
            `${pokemonEntry.flavor_text}`;

        await ctx.replyWithPhoto(pokemonData.sprite);
        await ctx.telegram.sendMessage(ctx.chat.id, message, keyboard);
    } catch (error: any) {
        console.error(error.name, error.message);

        if (error.name === "Error") {
            await ctx.reply(translate("error.default"));
        }

        if (error.name === "TypeError") {
            await ctx.reply(translate("error.entry"));
        }
    }
};

export {
    showPokemon,
    showGeneration,
    showRegion,
    showEntry,
}