import { Color } from "./specie.interface";

export interface PokedexNumber {
    entry_number: number;
    pokedex: Color;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: Color;
    version: Color;
}

export interface PokemonEntry {
    name: string;
    entries: any[]
}