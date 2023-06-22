import { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";
import { Pokemon } from "../types";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPokemonFromParams(id: string): Promise<Pokemon | undefined> {
  console.log(id);
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  return response.json() as Promise<Pokemon>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pokemon = await getPokemonFromParams(params.slug);

  if (!pokemon) {
    return {};
  }

  return {
    title: pokemon.name,
  };
}

export default async function PagePage({ params }: PageProps) {
  const pokemon = await getPokemonFromParams(params.slug);
  if (!pokemon) {
    return {};
  }

  return <div>Hello pokemon {pokemon.name}</div>;
}
