import { DreamWorld } from "./game.interface";
import { Versions } from "./version.interface";

export interface Sprites {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other?: Other;
    versions?: Versions;
    animated?: Sprites;
}


export interface OfficialArtwork {
    front_default: string;
    front_shiny: string;
}

export interface Home {
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
}

export interface Other {
    dream_world: DreamWorld;
    home: Home;
    "official-artwork": OfficialArtwork;
    showdown: Sprites;
}