import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function Runway({ params: { id } }: Props) {
  // const runway = await api.runway.getRunway({ address: id });

  return (
    <div>
      <h1>Runway</h1>
      {id}
      {/* <pre>{JSON.stringify(runway, null, 2)}</pre> */}
    </div>
  );
}
