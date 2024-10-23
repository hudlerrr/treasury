export default function Dao(props: { params: { address: string } }) {
  return (
    <div>
      <h1>DAO</h1>
      <p>{props.params.address}</p>
    </div>
  );
}
