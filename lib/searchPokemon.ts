import { Pokemon } from "@/app/(pokemon)/types";

export async function getPokemonFromParams(id: string): Promise<Pokemon> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  return response.json();
}
