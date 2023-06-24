"use client";

import { usePathname, useRouter } from "next/navigation";
import Container from "./Container";
import { cn } from "@/lib/utils";

const navbarItems = [
  {
    linkTo: "/",
    text: "Poke-List",
  },
  {
    linkTo: "/owned",
    text: "Owned",
  },
];

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <nav className="px-6 py-4 mb-4">
      <Container className="flex">
        <ul className="flex gap-4 mx-auto">
          {navbarItems.map((item) => (
            <li
              className={cn(
                "font-semibold cursor-pointer hover:text-red-500 transition-colors",
                path === item.linkTo && "text-red-500"
              )}
              onClick={() => router.push(item.linkTo)}
              key={item.linkTo}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
