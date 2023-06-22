import Link from "next/link";
import Image from "next/image";
import { PokemonList } from "./types";

async function getListPokemon(page: number): Promise<PokemonList> {
  const limit = 20;
  const offset = page < 1 ? 0 : (page - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  return response.json();
}

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const pokemonList = await getListPokemon(page);
  return (
    <div>
      {pokemonList.results.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
      <Link href={`/?page=${page - 1}`} passHref>
        <button disabled={page <= 1}>previous</button>
      </Link>
      {page}
      <Link href={`/?page=${page + 1}`} passHref>
        <button disabled={page * 20 > pokemonList.count}>next</button>
      </Link>
    </div>
  );
}
