export interface Region {
    id: number;
    locations: MainGeneration[];
    main_generation: MainGeneration;
    name: string;
    names: Name[];
    pokedexes: MainGeneration[];
    version_groups: MainGeneration[];
}

export interface RegionShort {
    name: string;
    generation: string
    totalLocalization: number;
    games: string,
}

export interface MainGeneration {
    name: string;
    url: string;
}

export interface Name {
    language: MainGeneration;
    name: string;
}
