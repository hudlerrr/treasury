import { api } from "@/trpc/server";
export default async function Dao(props: { params: { address: string } }) {

  const id = props.params.address;

  if (!id) {
    return NextResponse.json({ error: 'Id parameter is required' }, { status: 400 });
  }

  // Fetch DAO info based on the DAO name
  const response = await api.daoBase.getInfo({
    first: 20,
    skip: 0,
    orderBy: "created",
    id: id,
  });

  const treasuries = response[0].treasuries || [];
  const treasuryAddress = treasuries.length > 0 ? treasuries[0].address : null;

  // Fetch the DAO balance using the treasury address if available
  const daoBalance = treasuryAddress
    ? await api.safe.getBalance({ address: treasuryAddress as string })
    : null;

  return (
    <div>
      <h1>DAO: {response[0].name}</h1>
      <h1>About: {response[0].about}</h1>
      {treasuryAddress && <p>Treasury Address: {treasuryAddress}</p>}
      {daoBalance && (
        <div>
          <h2>DAO Balance</h2>
          <pre>{JSON.stringify(daoBalance, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
