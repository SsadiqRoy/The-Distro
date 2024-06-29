import Table from "../context/Table";
import SupplyItem from "../markups/SupplyItem";

function Supplies() {
  return (
    <Table>
      <Table.Filter filters={["all", "sent", "replied", "accepted", "canceled", "past"]} />

      <Table.Window>
        <Table.Head
          labels={["image", "name", "quantity", "current price", "new price", "-", "-"]}
          gridColumn="1fr 3fr 1fr 1fr 1fr 1fr 1fr"
        />

        <Table.Body>
          {Array.from({ length: 3 }).map((item, i) => (
            <SupplyItem key={i} number={5} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <SupplyItem key={i} number={1} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <SupplyItem key={i} number={2} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <SupplyItem key={i} number={3} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <SupplyItem key={i} number={4} />
          ))}
        </Table.Body>

        <Table.Footer total={94} consumed={40} />
      </Table.Window>
    </Table>
  );
}

export default Supplies;
