import { api } from "@/trpc/server";

export default async function Dao(props: { params: { address: string } }) {
  // Example aave.eth address look up
  const dao = await api.safe.getBalance({
    address: "0xC77624e672E762907435725Bbd3dFe70DDD40D13",
  });

  return (
    <div>
      <h1>DAO</h1>
      <p>{props.params.address}</p>
      <pre>{JSON.stringify(dao, null, 2)}</pre>
    </div>
  );
}
