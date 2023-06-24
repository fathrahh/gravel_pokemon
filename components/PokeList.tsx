import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { Pokemon } from "@/app/(pokemon)/types";
import ButtonLink from "./ButtonLink";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  pokemons: Pokemon[];
}

export function PokeCardSkeleton({ className }: { className?: string }) {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className={cn("p-3 rounded-md shadow-md", className)}>
            <div className="mx-auto grid gap-2">
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-4/5 h-2" />
              <Skeleton className="w-2/5 h-2" />
            </div>
          </div>
        ))}
    </>
  );
}

export default function PokeList({ pokemons }: Props) {
  return (
    <div className="grid xl:grid-cols-10 gap-3">
      {pokemons.map((pokemon) => (
        <Link
          href={`/${pokemon.id}`}
          key={pokemon.id}
          className="p-3 rounded-md shadow-md"
        >
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
          <span className="font-semibold capitalize">{pokemon.name}</span>
        </Link>
      ))}
    </div>
  );
}
