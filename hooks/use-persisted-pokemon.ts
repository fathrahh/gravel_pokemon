import * as React from "react";
import {
  PersistedPokemon,
  Pokemon,
  PokemonWithDate,
} from "@/app/(pokemon)/types";
import { getPokemonFromParams } from "@/lib/searchPokemon";

export default function usePersistedPokemon() {
  const [pokeDatas, setPokeDatas] = React.useState<PokemonWithDate[]>([]);
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async (persistedPokemon: PersistedPokemon[]) => {
      try {
        const promisedPokeData: PokemonWithDate[] = await Promise.all(
          persistedPokemon.map(async (persistedPoke) => {
            return {
              ...(await getPokemonFromParams(persistedPoke.id)),
              date: persistedPoke.date,
            };
          })
        );
        setPokeDatas(promisedPokeData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (!localStorage) return;

    const persistedPokemonStr = localStorage.getItem("pokemon");
    if (!persistedPokemonStr) {
      setIsLoading(false);
      return;
    }

    const persistedPokemon = JSON.parse(
      persistedPokemonStr
    ) as PersistedPokemon[];

    fetchData(persistedPokemon);
  }, []);

  return { pokeDatas, setPokeDatas, loading };
}
