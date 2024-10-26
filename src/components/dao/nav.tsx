"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function DaoNav() {
  return (
    <nav className="mt-4 border-b">
      <NavigationMenu>
        <NavigationMenuList className="flex">
          {["overview", "proposals", "treasury", "transactions"].map((item) => (
            <NavigationMenuLink asChild key={item}>
              <Link
                href={`/dao/${item}`}
                className="group inline-flex h-12 w-full items-center justify-center px-2 text-sm font-medium capitalize transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50 md:px-4"
              >
                {item}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
