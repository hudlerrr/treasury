"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function Header({ page }: { page: string }) {
  const pathname = usePathname();
  const parts = pathname?.split("/") ?? [];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        {pathname.includes("/dao") && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Button size="icon" variant="ghost" onClick={() => history.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </>
        )}
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {parts.map((part, index) => {
              if (part === "" || part === page) return null;
              const href = `/${parts.slice(1, index + 1).join("/")}`;

              return (
                <>
                  <BreadcrumbItem key={index} className="hidden md:block">
                    <BreadcrumbLink href={href}>{part}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < parts.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
