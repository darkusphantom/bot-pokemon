import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 *
 * @param {string | number} id
 */
const getPokemon = async (id) => {
  try {
    const data = await axios.get(`${process.env.URL_BASE}/pokemon/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getPokemon };
