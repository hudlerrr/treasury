"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavProps = {
  id: string;
};

export function DaoNav({ id }: NavProps) {
  const pathname = usePathname();
  return (
    <nav className="mt-6 flex w-full flex-wrap justify-center gap-4 border-border">
      {["overview", "proposals", "runway", "transactions"].map((item) => (
        <Link key={item} href={`/dao/${id}/${item === "overview" ? "" : item}`}>
          <Button
            variant="ghost"
            className={cn(
              "rounded-none px-4 py-2 capitalize text-muted-foreground hover:text-primary",
              (pathname === `/dao/${id}/${item}` ||
                (item === "overview" && pathname === `/dao/${id}`)) &&
                "border-b-2 border-primary",
            )}
          >
            {item}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
