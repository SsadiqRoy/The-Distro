import Table from "../context/Table";
import DashboardHeading from "../layouts/DashboardHeading";
import PurchaseItem from "../markups/PurchaseItem";

function Purchases() {
  const filters = [
    { name: "all", value: "?sort=-createdAt" },
    { name: "sent", value: "?active=true&supplierApproved=false&sort=-acceptedAt" },
    { name: "approved", value: "?active=true&supplierApproved=true&sort=-acceptedAt" },
    { name: "accepted", value: "?active=false&requesterAccepted=true&sort=-accptedAt" },
    { name: "canceled", value: "?active=false&requesterAccepted=false&sort=-accptedAt" },
    { name: "past", value: "?active=false&sort=-acceptedAt,-createdAt" },
  ];

  return (
    <>
      <DashboardHeading />
      <Table>
        <Table.Filter filters={filters} />

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
              <PurchaseItem key={i + 3} number={1} />
            ))}
            {Array.from({ length: 3 }).map((item, i) => (
              <PurchaseItem key={i + 6} number={2} />
            ))}
            {Array.from({ length: 3 }).map((item, i) => (
              <PurchaseItem key={i + 9} number={3} />
            ))}
            {Array.from({ length: 3 }).map((item, i) => (
              <PurchaseItem key={i + 12} number={4} />
            ))}
          </Table.Body>

          <Table.Footer total={26} consumed={10} />
        </Table.Window>
      </Table>
    </>
  );
}

export default Purchases;
