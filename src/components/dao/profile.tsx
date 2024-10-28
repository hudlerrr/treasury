import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { Calendar, MapPin, PenSquare, Users } from "lucide-react";
import Image from "next/image";
import { DaoNav } from "./nav";

type ProfileProps = {
  id: string;
};

export async function DaoProfileCard({ id }: ProfileProps) {
  const response = await api.daoBase.getInfo({
    first: 20,
    skip: 0,
    orderBy: "created",
    id,
  });

  return (
    <div className="flex items-center justify-center overflow-hidden rounded-xl border bg-background text-foreground">
      <div className="w-full">
        <div className="relative h-48 bg-muted">
          <Image
            src="/placeholder.svg?height=192&width=768"
            alt="Profile header"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative flex flex-col items-center px-4 py-5">
          <div className="absolute -top-16">
            <Avatar className="h-20 w-20 border md:h-24 md:w-24">
              <AvatarImage src={response[0]?.avatar ?? ""} alt="DAO Logo" />
              <AvatarFallback>DAO</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold">{response[0]?.name}</h1>
            <p className="text-sm text-muted-foreground">{id}</p>
            <p className="max-w-md text-sm">{response[0]?.about}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Ethereum</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>New York</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>March 2023</span>
              </div>
            </div>
          </div>
          <DaoNav id={id} />
        </div>
      </div>
    </div>
  );
}
