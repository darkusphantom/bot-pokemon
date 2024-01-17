import { Pokemon } from "../interfaces/pokemon/pokemon.interface";
import { PokemonSpecie } from "../interfaces/pokemon/specie.interface";

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
 * Gets the Pokémon data by ID or Name.
 * @async
 * @param {number | string} pokemon - The ID of the Pokémon to be retrieved.
 * @returns {Promise<Object|null>} An object with the Pokémon data corresponding to the provided ID, or null if the information could not be obtained.
 */
const getPokemonData = async (pokemon: any): Promise<Pokemon | null> => {
    try {
        const id = !Number(pokemon) ? pokemon.toLowerCase() : pokemon;
        const response = await baseApiClient.get(`/pokemon/${id}`);
        return response.data;
    } catch (err: any) {
        console.error("The pokemon data could not be retrieved");
        console.error(err.name, err.message);
        return null;
    }
};

/**
 * Gets the Pokémon specie data by ID or Name.
 * @async
 * @param {number | string} pokemonId - The ID of the Pokémon specie to be retrieved.
 * @returns {Promise<Pokemon|null>} An object with the Pokémon data corresponding to the provided ID, or null if the information could not be obtained.
 */
const getPokemonSpecie = async (pokemonId: any): Promise<PokemonSpecie | null> => {
    try {
        const id = !Number(pokemonId) ? pokemonId.toLowerCase() : pokemonId;
        const response = await baseApiClient.get(`/pokemon-species/${id}`);
        return response.data;
    } catch (err: any) {
        console.error("The pokemon species data could not be retrieved");
        console.error(err.name, err.message);
        return null;
    }
};

export {
    getPokemonData,
    getPokemonSpecie
}