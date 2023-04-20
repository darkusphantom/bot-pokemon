import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const URL_BASE = "https://pokeapi.co/api/v2";

/**
 *
 * @param {string | number} id
 */
const getPokemonData = async (id) => {
  try {
    // const pokemon = await axios.get(`${URL_BASE}/pokemon/${id}/?language=en`);
    const pokemon = await axios.get(`${URL_BASE}/pokemon/${id}`);
    return pokemon.data;
  } catch (err) {
    console.error("The pokemon data could not be retrieved");
    return null;
  }
};

export { getPokemonData };
