import { Metadata } from "next";

import { firstUppercase, randomBoolean, createId } from "@/lib/utils";

import { Abilities, MovePokemon, Pokemon, PokemonMove } from "../types";
import Image from "next/image";
import Container from "@/components/Container";
import LinkBack from "@/components/LinkBack";
import RadarChart from "@/components/chart/RadarChart";
import ButtonCatch from "@/components/ButtonCatch";
import { getPokemonFromParams } from "@/lib/searchPokemon";

interface PageProps {
  params: {
    slug: string;
  };
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

  const moves = await Promise.all(
    pokemon.moves.map((move) => {
      return getDataByUrl<PokemonMove>(move.move.url);
    })
  );

  const abilites = await Promise.all(
    pokemon.abilities.map((ability) => {
      return getDataByUrl<Abilities>(ability.ability.url);
    })
  );

  const seriesStat = pokemon.stats.map((stat) => {
    return {
      subject: stat.stat.name,
      A: stat.base_stat,
    };
  });

  return (
    <Container className="px-4">
      <LinkBack className="mb-8" />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <div className="max-w-max relative">
            <span className="absolute -top-5 text-xl  font-extrabold text-rose-600">
              {createId(pokemon.id.toString())}
            </span>
            <h2 className="text-5xl font-bold capitalize mb-2">
              {pokemon.name}
            </h2>
            <div className="font-semibold text-slate-500 capitalize flex justify-between">
              <span>Height</span> <span>{pokemon.height}</span>
            </div>
            <div className="font-semibold text-slate-500 capitalize flex justify-between">
              <span>Weight</span> <span>{pokemon.weight}</span>
            </div>
          </div>
          <div className="mx-auto my-4 relative w-64 h-64 lg:w-80 lg:h-80">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ??
                "/siluet.jpg"
              }
              fill={true}
              priority
              alt={pokemon.name}
            />
          </div>
          <ButtonCatch id={pokemon.id.toString()} />
        </div>
        <div className="grid grid-cols-12 space-x-5 col-span-12 lg:col-span-8">
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-4xl text-center font-bold">Bio</h3>
            <div className="mt-6">
              <h4 className="mb-1 text-slate-500 capitalize font-semibold">
                Abilities
              </h4>
              <hr />
              {abilites.map((ability) => {
                const effectEntrie =
                  ability.effect_entries.filter(
                    (entrie) => entrie.language.name === "en"
                  )[0] ?? null;
                return (
                  <div className="mt-2" key={ability.id}>
                    <div className="text-sky-900 capitalize font-semibold">
                      {ability.name}
                    </div>
                    {effectEntrie && (
                      <p className="text-sm first-letter:capitalize text-slate-600">
                        {effectEntrie.effect}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3">
              <h4 className="mb-1 text-slate-500 capitalize font-semibold">
                Moves
              </h4>
              <hr />
              {moves.map((move, idx) => {
                const effectEntrie =
                  move.effect_entries.filter(
                    (entrie) => entrie.language.name === "en"
                  )[0] ?? null;
                if (idx > 2) return null;
                return (
                  <div className="mt-2" key={move.id}>
                    <div className="font-semibold text-sky-900 capitalize flex justify-between">
                      <span>{move.name}</span>
                      <span>{move.power}</span>
                    </div>
                    {effectEntrie && (
                      <p className="text-sm first-letter:capitalize text-slate-600">
                        {effectEntrie.effect}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 mt-4 sm:mt-0">
            <h3 className="text-4xl text-center font-bold">Stats</h3>
            <RadarChart data={seriesStat} />
          </div>
        </div>
      </div>
    </Container>
  );
}
