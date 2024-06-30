import Table from "../context/Table";
import PurchaseItem from "../markups/PurchaseItem";

function Purchases() {
  return (
    <Table>
      <Table.Filter filters={["all", "pending", "approved", "declined", "past"]} />

      <Table.Window>
        <Table.Head
          labels={["image", "name", "quantity", "unit price", "total price", "available", "-", "-"]}
          gridColumn="1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr"
        />

        <Table.Body>
          {Array.from({ length: 3 }).map((item, i) => (
            <PurchaseItem key={i} number={5} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <PurchaseItem key={i} number={1} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <PurchaseItem key={i} number={2} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <PurchaseItem key={i} number={3} />
          ))}
          {Array.from({ length: 3 }).map((item, i) => (
            <PurchaseItem key={i} number={4} />
          ))}
        </Table.Body>

        <Table.Footer total={26} consumed={10} />
      </Table.Window>
    </Table>
  );
}

export default Purchases;
