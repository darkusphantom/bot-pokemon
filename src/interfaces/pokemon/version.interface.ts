import { Crystal, DreamWorld, Gold, RedBlue } from "./game.interface";
import { Home, OfficialArtwork, Sprites } from "./sprite.interface";

export interface Versions {
    "generation-i": GenerationI;
    "generation-ii": GenerationIi;
    "generation-iii": GenerationIii;
    "generation-iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-vi": { [key: string]: Home };
    "generation-vii": GenerationVii;
    "generation-viii": GenerationViii;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow: RedBlue;
}

export interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Gold;
}


export interface GenerationIii {
    emerald: OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire": Gold;
}

export interface GenerationIv {
    "diamond-pearl": Sprites;
    "heartgold-soulsilver": Sprites;
    platinum: Sprites;
}

export interface GenerationV {
    "black-white": Sprites;
}


export interface GenerationVii {
    icons: DreamWorld;
    "ultra-sun-ultra-moon": Home;
}


export interface GenerationViii {
    icons: DreamWorld;
}
