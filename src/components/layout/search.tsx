"use client";
import { Search } from "lucide-react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Link from "next/link";

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setOpen(true)}>
          <Search />
          <span>Search</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search by ENS name..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((suggestion) => (
              <Link href={suggestion.href} key={suggestion.href}>
                <CommandItem
                  value={suggestion.name}
                  onSelect={() => setOpen(false)}
                >
                  {suggestion.name}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

const suggestions = [
  {
    href: "/dao/aave.eth",
    name: "Aave",
  },
  {
    href: "/dao/tomoondao.eth",
    name: "MoonDAO",
  },
  {
    href: "/dao/ens.eth",
    name: "ENS",
  },
  {
    href: "/dao/apecoin.eth",
    name: "ApeCoin DAO",
  },
];
