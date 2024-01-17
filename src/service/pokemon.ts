import { getGenerationData, getRegionData } from "../client";
import { getPokemonData, getPokemonSpecie } from "../client/pokemonApiClient";
import { GenerationShort } from "../interfaces/pokemon/generation";
import { PokemonEntry } from "../interfaces/pokemon/pokedex.interface";
import { Pokemon, PokemonShort } from "../interfaces/pokemon/pokemon.interface";
import { RegionShort } from "../interfaces/pokemon/region.interface";
import { capitalize, regionImages, regionLimits } from "../utils";

/**
 * Gets the Pokémon information corresponding to the name or ID provided.
 *
 * @async
 * @param {string|number} pokemon - The name or ID of the Pokémon to be retrieved.
 * @returns {Promise<Object|null>} An object with the Pokémon information corresponding to the name or ID provided, or null if the information could not be obtained.
 */
const getPokemon = async (pokemon: string | number): Promise<PokemonShort | null> => {
    const pokemonSelected = await getPokemonData(pokemon);
    if (!pokemonSelected) return null;

    const name = capitalize(pokemonSelected.name);
    const pokemonTypes = pokemonSelected.types.map((pk: any) =>
        capitalize(pk.type.name)
    );

    const types =
        pokemonTypes.length < 2 ? pokemonTypes[0] : pokemonTypes.join(", ");

    const abilities = pokemonSelected.abilities
        .map((pk: any) => capitalize(pk.ability.name))
        .join(", ");

    const region = getRegionName(pokemonSelected.id);

    return {
        id: pokemonSelected.id,
        name,
        types,
        abilities,
        height: pokemonSelected.height,
        sprites: pokemonSelected.sprites.front_default,
        region,
    };
};

/**
 * Obtains the data of a Pokémon generation from its ID.
 *
 * @async
 * @param {number} id - The ID of the generation of Pokémon to be obtained.
 * @returns {Promise<Object>} An object containing the following generation data:
 * - id: The generation ID.
 * - region: The name of the main region of the generation.
 * - totalNewPokemon: The total number of Pokémon species that were introduced in the generation.
 * - src: The URL of the image of the region corresponding to the generation.
 * - games: A string containing the names of the video games corresponding to the generation.
 * - totalNewTypes: The total number of Pokémon types introduced in the generation.
 */
const getGeneration = async (id: number): Promise<GenerationShort | null> => {
    const generation = await getGenerationData(id);
    if (!generation) return null;

    const games = generation.version_groups.map((game: any) => game.name).join(", ");
    const regionImage = regionImages[generation.id] || "Image not found";

    return {
        id: generation.id,
        region: generation.main_region.name,
        totalNewPokemon: generation.pokemon_species.length,
        src: regionImage,
        games,
        totalNewTypes: generation.types.length,
    };
};

/**
 * Obtains the data of a Pokémon region from its ID or name.
 *
 * @async
 * @param {number|string} id - The ID or name of the region of Pokémon to be obtained.
 * @returns {Promise<Object>} An object containing the following region data:
 */
const getRegion = async (id: number | string): Promise<RegionShort | null> => {
    const region = await getRegionData(id);
    if (!region) return null

    const games = region.version_groups
        .map((game: any) => game.name)
        .join(", ");

    return {
        name: capitalize(region.name),
        generation: region.main_generation.name,
        totalLocalization: region.locations.length,
        games,
    };
};

/**
 * Gets the flavor text entries of a specific pokemon.
 *
 * @async
 * @param {string} pokemon - The name or ID of the pokemon.
 * @returns {Promise<PokemonEntry>} - Object containing the pokemon name and its flavor text entries.
 */
const getEntries = async (pokemon: string): Promise<PokemonEntry | null> => {
    const pokemonSpecie = await getPokemonSpecie(pokemon);
    const entries = pokemonSpecie?.flavor_text_entries;

    if (!entries) return null;

    return {
        name: pokemonSpecie.name,
        entries,
    };
};

/**
 * Gets the name of the Pokémon region corresponding to the provided ID.
 *
 * @param {number} id - Pokemon ID.
 * @returns {string} The name of the region in capital letters, or "Region not found" if no region including the ID is found.
 */
const getRegionName = (id: number): string => {
    if (!id) return "Region not found";

    // ([_, limits]) is a destructuring syntax that extracts
    // only the value of the key-value pair (i.e., the two-element array)
    // and assigns it to the variable limits. The variable _ is used to indicate
    // that we don't need the first element of the destructuring
    // (i.e., the key of the key-value pair).
    const region = Object.entries(regionLimits).find(
        ([_, limits]) => id >= limits.min && id <= limits.max
    );
    return region ? capitalize(region[0]) : "Region not found";
};

export {
    getPokemon,
    getGeneration,
    getRegion,
    getEntries,
    getRegionName,
}