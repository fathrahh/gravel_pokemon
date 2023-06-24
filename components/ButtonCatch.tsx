"use client";

import * as React from "react";
import { randomBoolean } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { PersistedPokemon } from "@/app/(pokemon)/types";

interface Props {
  id: string;
}

export default function ButtonCatch({ id }: Props) {
  const [isObtained, setIsObtained] = React.useState(false);
  const { toast } = useToast();

  const catchPokemon = () => {
    const isCatch = randomBoolean();

    if (isCatch) {
      let storedPokemon: PersistedPokemon[] = [];
      const currentPokemon = localStorage.getItem("pokemon");

      if (currentPokemon) {
        storedPokemon = JSON.parse(currentPokemon);
      }
      setIsObtained(true);
      storedPokemon.push({
        id,
        date: Date.now(),
      });

      localStorage.setItem("pokemon", JSON.stringify(storedPokemon));
      toast({
        title: "Pokemon are Obtained !!!",
        description: "Please Check Your Updated Dex",
      });
      return;
    }

    toast({
      variant: "destructive",
      description: "Failed to Catch Pokemon",
    });
  };

  React.useEffect(() => {
    const currentPokemon = localStorage.getItem("pokemon");
    if (currentPokemon) {
      const storedPokemon = JSON.parse(currentPokemon) as PersistedPokemon[];
      setIsObtained(storedPokemon.some((store) => store.id === id));
    }
  }, [id]);

  return (
    <button
      className="disabled:cursor-not-allowed text-white px-4 py-2 rounded bg-slate-900 font-semibold"
      disabled={isObtained}
      onClick={catchPokemon}
    >
      {isObtained ? "Is Obtained" : "Catch Me"}
    </button>
  );
}
