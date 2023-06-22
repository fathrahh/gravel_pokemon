import { Metadata } from "next";

import { absoluteUrl, firstUppercase, randomBoolean } from "@/lib/utils";
import { Abilities, Pokemon, PokemonMove } from "../types";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPokemonFromParams(id: string): Promise<Pokemon> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  return response.json();
}

async function getDataByUrl<T extends any>(url: string): Promise<T> {
  const response = await fetch(url);
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

  const moves = await getDataByUrl<PokemonMove>(pokemon.moves[0].move.url);
  const abilites = await getDataByUrl<Abilities>(
    pokemon.abilities[0].ability.url
  );

  const effectEntrie = abilites.effect_entries.filter(
    (entrie) => entrie.language.name === "en"
  )[0];

  return (
    <div>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        width={140}
        height={140}
        alt={pokemon.name}
      />
      <div>name : {pokemon.name}</div>
      <div>Height: {pokemon.height}</div>
      <div>Weight: {pokemon.weight}</div>
      <div>abilities: {abilites.name}</div>
      <p>abilities effect entries: {effectEntrie.effect}</p>
      <div>move: {moves.name}</div>
      <div>move power : {moves.power}</div>
      <div>Status</div>
      {pokemon.stats.map((stat) => (
        <div key={stat.stat.name}>
          {stat.stat.name} : {stat.base_stat}
        </div>
      ))}
    </div>
  );
}
