import { Metadata } from "next";

import { absoluteUrl, firstUppercase } from "@/lib/utils";
import { Pokemon } from "../types";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPokemonFromParams(id: string): Promise<Pokemon> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  return response.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pokemon = await getPokemonFromParams(params.slug);

  if (!pokemon) {
    return {};
  }

  return {
    title: firstUppercase(pokemon.name),
  };
}

export default async function PagePage({ params }: PageProps) {
  const pokemon = await getPokemonFromParams(params.slug);
  if (!pokemon) {
    return {};
  }

  return <div>{pokemon.name}</div>;
}
