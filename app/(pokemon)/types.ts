export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonUtilities[];
};

export type Pokemon = {
  abilities: any[];
  name: string;
  images: string;
  types: TypesPokemon[];
  weight: number;
  height: number;
  moves: MovePokemon[];
  stats: PokemonStats[];
};

type PokemonUtilities = {
  name: string;
  url: string;
};

type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: PokemonUtilities;
};

type MovePokemon = {
  move: PokemonUtilities;
  version_group_details: any;
};

type TypesPokemon = {
  slot: number;
  type: PokemonUtilities;
};
