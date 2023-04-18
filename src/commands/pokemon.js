import { getPokemon } from "../utils/api";

const getPokemonSelected = (pokemon) => {
  const pokemon = getPokemon(pokemon);
  console.log(pokemon);
};

export { getPokemonSelected };
