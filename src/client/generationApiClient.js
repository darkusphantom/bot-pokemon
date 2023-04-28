import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const URL_BASE = "https://pokeapi.co/api/v2";

const baseApiClient = new axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

/**
 * Gets the Pokémon generation data corresponding to the provided ID.
 *
 * @async
 * @param {number} id - The ID of the desired Pokémon generation.
 * @returns {Promise<Object|null>} An object with the Pokémon generation data corresponding to the provided ID, or null if the information could not be obtained.
 */
export const getGenerationData = async (id) => {
  try {
    const response = await baseApiClient.get(`/generation/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
