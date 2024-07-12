import { useEffect, useState } from "react";
import Table from "../context/Table";
import DashboardHeading from "../layouts/DashboardHeading";
import PurchaseItem from "../markups/PurchaseItem";
import { useGetPurchases } from "../hooks/purchaseHooks";
import { DisplayAltMessage, Spinner } from "../components/elementComponents";

function Purchases() {
  const [meta, setMeta] = useState({});
  const [purchases, setPurchases] = useState();
  const { data, isLoading } = useGetPurchases();

  useEffect(() => {
    data && setMeta(data.meta);
    data && setPurchases(data.data);
  }, [data]);

  const filters = [
    { name: "all", value: "?sort=-createdAt,-quantity" },
    { name: "pending", value: "?status=pending&sort=-createdAt" },
    { name: "approved", value: "?status=approved&sort=-statusChangedAt" },
    { name: "declined", value: "?status=declined&sort=-statusChangedAt" },
    { name: "past", value: "?status[in]=approved,declined&sort=-statusChangedAt" },
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
            {isLoading && <Spinner />}
            {!isLoading && !meta.length && <DisplayAltMessage message="No purchase Request available" />}

            {meta.length > 0 && purchases.map((purchase) => <PurchaseItem key={purchase.id} purchase={purchase} />)}
          </Table.Body>
          <Table.Footer total={meta.total} consumed={meta.consumed} page={meta.page} next={meta.available} prev={meta.previous} />{" "}
        </Table.Window>
      </Table>
    </>
  );
}

export default Purchases;
