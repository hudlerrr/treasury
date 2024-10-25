import { Suspense } from "react";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function Dao({ params: { id } }: Props) {
  // Fetch DAO info based on the DAO name
  const response = await api.daoBase.getInfo({
    first: 20,
    skip: 0,
    orderBy: "created",
    id,
  });

  const treasuries = response[0]?.treasuries ?? [];
  const treasuryAddress = treasuries[0]?.address;

  return (
    <div>
      <h1>DAO: {response[0]?.name}</h1>
      <h1>About: {response[0]?.about}</h1>

      {treasuries.length > 0 && <h3>Treasuries</h3>}
      {treasuries.map((treasury) => (
        <div key={treasury.address}>
          <p>
            {treasury.name}: {treasury.address}
          </p>
        </div>
      ))}

      <Suspense fallback={<p>Loading treasury balance...</p>}>
        <TreasuryComponent treasuryAddress={treasuryAddress} />
      </Suspense>
    </div>
  );
}

const TreasuryComponent = async ({
  treasuryAddress,
}: {
  treasuryAddress: string | undefined;
}) => {
  if (!treasuryAddress) {
    return null;
  }

  const daoBalance = await api.safe
    .getBalance({ address: treasuryAddress })
    .catch(() => {
      return null;
    });

  return (
    <div>
      {daoBalance && (
        <div>
          <h2>DAO Balance</h2>
          <pre>{JSON.stringify(daoBalance, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
