import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const URL_BASE = "https://pokeapi.co/api/v2";

const baseApiClient = new axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en",
  },
});

/**
 * Gets the Pokémon data by ID or Name.
 * @async
 * @param {number | string} id - The ID of the Pokémon to be retrieved.
 * @returns {Promise<Object|null>} An object with the Pokémon data corresponding to the provided ID, or null if the information could not be obtained.
 */
export const getPokemonData = async (pokemon) => {
  try {
    const id = !Number(pokemon) ? pokemon.toLowerCase() : pokemon;
    const response = await baseApiClient.get(`/pokemon/${id}`);
    return response.data;
  } catch (err) {
    console.error("The pokemon data could not be retrieved");
    return null;
  }
};
