import { getPokemon } from "../utils/api";
import { capitalize, deleteSpace } from "../utils/format-words";

const showPokemon = async (pokemon) => {
  const indexData = pokemon.indexOf(" ");
  const pokemonId = deleteSpace(pokemon.slice(indexData, pokemon.length));
  const pokemonSelected = await getPokemon(pokemonId);

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

export { showPokemon };
