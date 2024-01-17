export interface Generation {
    abilities: MainRegion[];
    id: number;
    main_region: MainRegion;
    moves: MainRegion[];
    name: string;
    names: Name[];
    pokemon_species: MainRegion[];
    types: any[];
    version_groups: MainRegion[];
}

export interface GenerationShort {
    id: string | number
    region: string
    totalNewPokemon: number
    src: string,
    games: string,
    totalNewTypes: number
}

export interface MainRegion {
    name: string;
    url: string;
}

export interface Name {
    language: MainRegion;
    name: string;
}
