import { getPokemonData } from "./api";
import { capitalize, deleteSpace } from "./format-words";

/**
 *  Get a pokemon data
 *
 * @async
 * @param {string | number} pokemon
 * @returns A object that contains:
 *  - id: The id of the pokemon
 * - name: The name of the pokemon
 * - type: The type of the pokemon
 */
const getPokemon = async (pokemon) => {
  const indexData = pokemon.indexOf(" ");
  const pokemonId = deleteSpace(pokemon.slice(indexData, pokemon.length));
  const pokemonSelected = await getPokemonData(pokemonId);

  const name = capitalize(pokemonSelected.name);
  const pokemonTypes = pokemonSelected.types.map((type) =>
    capitalize(type.type.name)
  );

  const types =
    pokemonTypes.length < 2
      ? `${pokemonTypes[0]}`
      : `${pokemonTypes[0]}, ${pokemonTypes[1]}`;

  return {
    id: pokemonSelected.id,
    name,
    types,
  };
};

export { getPokemon };
