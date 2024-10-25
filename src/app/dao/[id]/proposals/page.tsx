import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function Proposals({ params: { id } }: Props) {
  const proposals = await api.proposals.getProposals({ space: id });
  return (
    <div>
      <h1>Proposals</h1>
      <pre>{JSON.stringify(proposals, null, 2)}</pre>
    </div>
  );
}
