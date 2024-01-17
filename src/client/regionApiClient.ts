import { Region } from "../interfaces/pokemon/region.interface";

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const URL_BASE = "https://pokeapi.co/api/v2";

const baseApiClient = new axios.create({
    baseURL: URL_BASE,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});


/**
 * Gets the Region pokemon data by ID or Name.
 *
 * @async
 * @param {number | string} pokemonId - The ID of the Pokémon to be retrieved.
 * @returns {Promise<Object|null>} An object with the Pokémon data corresponding to the provided ID, or null if the information could not be obtained.
 */
export const getRegionData = async (pokemonId: number | string): Promise<Region | null> => {
    try {
        const id = !Number(pokemonId) ? String(pokemonId).toLowerCase() : pokemonId;
        const response = await baseApiClient.get(`/region/${id}`);
        return response.data;
    } catch (err) {
        console.error("The region data could not be retrieved");
        return null;
    }
};
