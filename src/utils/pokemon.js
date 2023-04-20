import { getPokemonData } from "./api";
import { capitalize } from "./format-words";

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

  return {
    id: pokemonSelected.id,
    name,
    types,
    abilities,
    height: pokemonSelected.height,
    sprite: pokemonSelected.sprites.front_default,
  };
};

export { getPokemon };
