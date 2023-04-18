import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 *
 * @param {string | number} id
 */
const getPokemon = async (id) => {
  try {
    const pokemon = await axios.get(`${process.env.URL_BASE}/pokemon/${id}`);
    return pokemon.data;
  } catch (err) {
    console.error("Error");
    return null;
  }
};

export { getPokemon };
