import { Suspense } from "react";
import { Pokemon, PokemonList } from "./types";

import ButtonLink from "@/components/ButtonLink";
import Container from "@/components/Container";
import PokeList, { PokeCardSkeleton } from "@/components/PokeList";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

async function getListPokemon(page: number): Promise<PokemonList> {
  const limit = 20;
  const offset = page < 1 ? 0 : (page - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  return response.json();
}

async function getPokemonForm(url: string): Promise<Pokemon> {
  const response = await fetch(url);

  return response.json();
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pokemonList = await getListPokemon(page);

  const promisePokemon = pokemonList.results.map((data) => {
    return getPokemonForm(data.url);
  });

  const pokeData = await Promise.all(promisePokemon);

  return (
    <Container className="flex flex-col flex-1 -translate-y-10 px-4 xl:justify-center xl:items-center">
      <Suspense
        fallback={
          <div className="grid md:grid-cols-6 gap-5">
            <PokeCardSkeleton />
          </div>
        }
      >
        <PokeList pokemons={pokeData} />
      </Suspense>

      <div className="flex items-center gap-4 my-6 lg:my-12 mx-auto">
        <ButtonLink href={`/?page=${page - 1}`} disabled={page <= 1}>
          Previous
        </ButtonLink>
        <span className="font-semibold">{page}</span>
        <ButtonLink
          href={`/?page=${page + 1}`}
          disabled={page * 20 > pokemonList.count}
        >
          Next
        </ButtonLink>
      </div>
    </Container>
  );
}
