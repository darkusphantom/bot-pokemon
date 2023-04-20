import { getPokemonData } from "../client/pokemonApiClient";
import { getGenerationData } from "../client/generationApiClient";
import { capitalize } from "./format-words";

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

  const region = getRegion(pokemonSelected.id);

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
  const regionImage = getRegionImage(generation.id);

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
 * Gets the name of the Pokémon region corresponding to the provided ID.
 *
 * @param {number} id - Pokemon ID.
 * @returns {string} The name of the region in capital letters, or "Region not found" if no region including the ID is found.
 */
const getRegion = (id) => {
  const regionLimits = {
    kanto: { min: 1, max: 151 },
    johto: { min: 152, max: 251 },
    hoenn: { min: 252, max: 386 },
    sinnoh: { min: 387, max: 493 },
    unova: { min: 494, max: 649 },
    kalos: { min: 650, max: 721 },
    alola: { min: 722, max: 809 },
    galar: { min: 810, max: 905 },
    paldea: { min: 906, max: 1010 },
  };

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

/**
 * Gets the URL of the image corresponding to the Pokémon region with the provided ID.
 *
 * @param {number} id - The ID of the Pokémon region.
 * @returns {string} The URL of the image corresponding to the Pokémon region, or "Image not found" if no corresponding image is found.
 */
const getRegionImage = (id) => {
  const regionImages = {
    1: "https://wallpapercave.com/wp/wp7280733.jpg", // Kanto
    2: "https://static.wikia.nocookie.net/pokemon/images/f/fe/Johto_HGSS.png", // Johto
    3: "https://static.wikia.nocookie.net/pokemon/images/d/dd/Hoenn_E.jpg", // Hoenn
    4: "https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/1200px-Sinnoh_BDSP_artwork.png", // Sinnoh
    5: "https://i.imgur.com/K9LZvda.jpeg", // Unova
    6: "https://media-cerulean.cursecdn.com/attachments/4/847/super__large_kalos_map.jpg", // Kalos
    7: "https://pm1.narvii.com/6121/60604da920ae483be27bf415e437c5f8cf546efe_hq.jpg", // Alola
    8: "https://external-preview.redd.it/XCoGofy8sqgIKB8r51tcqCaWTeWnpkXlb6I_q5HZcDw.jpg?auto=webp&s=089b79f69e67806a82815e049c4c6c88805f54b5", // Galar
    9: "https://progameguides.com/wp-content/uploads/2022/09/Pokemon-Scarlet-and-Violet-Paldea-Map-900x506.jpg", // Paldea
  };

  return regionImages[id] || "Image not found";
};
