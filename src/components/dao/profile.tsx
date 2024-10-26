import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
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
    <>
      <div className="flex flex-col items-start gap-6 p-4 md:flex-row md:items-center md:p-6">
        <Avatar className="h-20 w-20 border md:h-24 md:w-24">
          <AvatarImage src={response[0]?.avatar ?? ""} alt="DAO Logo" />
          <AvatarFallback>DAO</AvatarFallback>
        </Avatar>
        <div className="grid gap-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <p className="text-2xl font-semibold">{response[0]?.name}</p>
            <Button variant="outline" size="sm">
              Join DAO
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{id}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{response[0]?.followersCount} members</span>
            </div>
          </div>
          <p className="max-w-md text-sm">{response[0]?.about}</p>
        </div>
      </div>
      <DaoNav id={id} />
    </>
  );
}
