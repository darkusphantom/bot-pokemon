import { PalParkEncounter } from "./location.interface";
import { FlavorTextEntry, PokedexNumber } from "./pokedex.interface";

export interface PokemonSpecie {
    base_happiness: number;
    capture_rate: number;
    color: Color;
    egg_groups: Color[];
    evolution_chain: EvolutionChain;
    evolves_from_species: Color;
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: any[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: Color;
    growth_rate: Color;
    habitat: Color;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: PalParkEncounter[];
    pokedex_numbers: PokedexNumber[];
    shape: Color;
    varieties: Variety[];
}

export interface Color {
    name: string;
    url:  string;
  }
  
  export interface EvolutionChain {
    url: string;
  }
  
  export interface Genus {
    genus:    string;
    language: Color;
  }
  
  export interface Name {
    language: Color;
    name:     string;
  }
  

  
  export interface Variety {
    is_default: boolean;
    pokemon:    Color;
  }
  