import { useEffect, useState } from "react";
import Table from "../context/Table";
import { useGetSupplies } from "../hooks/supplyHooks";
import DashboardHeading from "../layouts/DashboardHeading";
import SupplyItem from "../markups/SupplyItem";
import { DisplayAltMessage, Spinner } from "../components/elementComponents";

function Supplies() {
  const [meta, setMeta] = useState({});
  const [supplies, setSupplies] = useState();
  const { data, isLoading } = useGetSupplies();

  useEffect(() => {
    if (!data) return;
    setMeta(data.meta);
    setSupplies(data.data);
  }, [data]);

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
            labels={["image", "name", "quantity", ["current price", { justifySelf: "left" }], ["new price", { justifySelf: "left" }], "-", "-"]}
            gridColumn="1fr 3fr 1fr 1fr 1fr 1fr 1fr"
          />

          <Table.Body>
            {isLoading && <Spinner />}
            {!isLoading && !meta.length && <DisplayAltMessage message="No supply request" />}
            {meta.length > 0 && supplies.map((supply) => <SupplyItem key={supply.id} supply={supply} />)}
          </Table.Body>

          <Table.Footer total={meta.total} consumed={meta.consumed} page={meta.page} next={meta.available} prev={meta.previous} />
        </Table.Window>
      </Table>
    </>
  );
}

export default Supplies;
