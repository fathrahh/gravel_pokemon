"use client";

import usePersistedPokemon from "@/hooks/use-persisted-pokemon";
import * as React from "react";
import { PokeCardSkeleton } from "./PokeList";
import Image from "next/image";
import { PersistedPokemon } from "@/app/(pokemon)/types";

export default function PokeOwned() {
  const { loading, pokeDatas, setPokeDatas } = usePersistedPokemon();

  if (loading) {
    return (
      <div className="grid xl:grid-cols-4 gap-5">
        <PokeCardSkeleton />
      </div>
    );
  }

  if (pokeDatas.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center text-slate-400/40 justify-center font-semibold">
        <span className="text-5xl text-slate-400/60">You have no pokemon</span>{" "}
        <br />
        <span className="text-slate-400/50">
          Catch the pokemon on the pokemon detail page
        </span>
      </div>
    );
  }

  const releasePokemon = (id: string) => {
    const _tempData = [...pokeDatas];
    const releasedPokemon = _tempData.filter((temp) => {
      return temp.id.toString() !== id;
    });

    const currentObtainedPokemon = JSON.parse(
      localStorage.getItem("pokemon") ?? "[]"
    ) as PersistedPokemon[];

    if (currentObtainedPokemon.length === 0) {
      localStorage.setItem("pokemon", "[]");
      setPokeDatas(releasedPokemon);
      return;
    }

    const releasedPersistedPokemon = currentObtainedPokemon.filter((t) => {
      return t.id !== id;
    });

    localStorage.setItem("pokemon", JSON.stringify(releasedPersistedPokemon));
    setPokeDatas(releasedPokemon);
  };

  return (
    <div className="grid xl:grid-cols-5 gap-3">
      {pokeDatas.map((pokemon) => (
        <div key={pokemon.id} className="p-3 rounded-md shadow-md">
          <div className="flex mx-auto">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ??
                "/siluet.jpg"
              }
              alt={pokemon.name}
              width={78}
              height={78}
            />
          </div>
          <div className="h-0.5 w-full bg-gray-100 rounded-full mb-1" />
          <div className="my-2">
            <span className="font-semibold capitalize">{pokemon.name}</span>
            <p className="text-sm text-slate-400 font-semibold">
              Obtained on: {new Date(pokemon.date).toDateString()}
            </p>
          </div>
          <button
            onClick={() => releasePokemon(pokemon.id.toString())}
            className="inline-block disabled:cursor-not-allowed text-white px-4 py-2 rounded bg-slate-900 font-semibold text-sm"
          >
            Release Me
          </button>
        </div>
      ))}
    </div>
  );
}
