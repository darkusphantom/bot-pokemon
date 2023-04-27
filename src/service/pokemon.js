import { getPokemonData, getPokemonSpecie } from "../client/pokemonApiClient";
import { getGenerationData } from "../client/generationApiClient";
import { getRegionData } from "../client/regionApiClient";
import { capitalize } from "../utils/format-words";
import { regionImages, regionLimits } from "../utils/const";

/**
 * Gets the Pokémon information corresponding to the name or ID provided.
 *
 * @async
 * @param {string|number} pokemon - The name or ID of the Pokémon to be retrieved.
 * @returns {Promise<Object|null>} An object with the Pokémon information corresponding to the name or ID provided, or null if the information could not be obtained.
 */
export const getPokemon = async (pokemon) => {
  const pokemonSelected = await getPokemonData(pokemon);

  const name = capitalize(pokemonSelected.name);
  const pokemonTypes = pokemonSelected.types.map((pk) =>
    capitalize(pk.type.name)
  );

  const types =
    pokemonTypes.length < 2 ? pokemonTypes[0] : pokemonTypes.join(", ");

  const abilities = pokemonSelected.abilities
    .map((pk) => capitalize(pk.ability.name))
    .join(", ");

  const region = getRegionName(pokemonSelected.id);

  return {
    id: pokemonSelected.id,
    name,
    types,
    abilities,
    height: pokemonSelected.height,
    sprite: pokemonSelected.sprites.front_default,
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
export const getGeneration = async (id) => {
  const generation = await getGenerationData(id);
  const games = generation.version_groups.map((game) => game.name).join(", ");
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
export const getRegion = async (id) => {
  const region = await getRegionData(id);
  const games = region.version_groups.map((game) => game.name).join(", ");

  if (!games) return;

  return {
    name: capitalize(region.name),
    generation: region.main_generation.name,
    totalLocalization: region.locations.length,
    games,
  };
};

export const getEntries = async (pokemon) => {
  const pokemonSpecie = await getPokemonSpecie(pokemon);
  console.log(pokemonSpecie + "\n\n");
  const entries = pokemonSpecie.flavor_text_entries;

  if (!entries) return;

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
const getRegionName = (id) => {
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
