import Image from "next/image";

import { Pokemon } from "@/app/(pokemon)/types";
import ButtonLink from "./ButtonLink";
import Link from "next/link";

interface Props {
  pokemons: Pokemon[];
}

export default function PokeList({ pokemons }: Props) {
  return (
    <div className="grid xl:grid-cols-10 gap-3">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="p-3 rounded-md shadow-md">
          <div className="flex mx-auto">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={78}
              height={78}
            />
          </div>
          <div className="h-0.5 w-full bg-gray-100 rounded-full mb-1" />
          <span className="font-semibold capitalize">{pokemon.name}</span>
          <div>
            <Link href={`/${pokemon.id}`} className="text-gray-400">
              Go Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
