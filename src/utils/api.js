import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 *
 * @param {string | number} id
 */
const getPokemonData = async (id) => {
  try {
    const pokemon = await axios.get(`${process.env.URL_BASE}/pokemon/${id}`);
    return pokemon.data;
  } catch (err) {
    console.error("The pokemon data could not be retrieved");
    return null;
  }
};

export { getPokemonData };
