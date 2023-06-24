import Container from "@/components/Container";
import PokeOwned from "@/components/PokeOwned";

export default function Page() {
  return (
    <Container className="px-4 flex-1 flex flex-col">
      <PokeOwned />
    </Container>
  );
}
