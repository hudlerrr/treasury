import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function Transactions({ params: { id } }: Props) {
  // const proposals = await api.transactionSummary.getSummary({
  //   address: id,
  //   dateRange: "week",
  // });

  return (
    <div>
      <h1>Proposals</h1>
      {/* <pre>{JSON.stringify(proposals, null, 2)}</pre> */}
    </div>
  );
}
