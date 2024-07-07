import styled from "styled-components";
import SupplierItem from "../markups/SupplierItem";
import { useGetSupplierSupplies } from "../hooks/supplyHooks";
import Table from "../context/Table";
import { useEffect, useState } from "react";
import { DisplayAltMessage, Spinner } from "../components/elementComponents";

const StyledMain = styled.main`
  width: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  > :first-child {
    flex-grow: 1;
  }
`;

/*




*/

function Supplier() {
  const [meta, setMeta] = useState({});
  const [supplies, setSupplies] = useState();
  const { data, isLoading } = useGetSupplierSupplies();

  useEffect(() => {
    data && setMeta(data.meta);
    data && setSupplies(data.data);
  }, [data]);

  const labels = [
    "image",
    "name",
    "quantity",
    ["current price", { justifySelf: "left", marginLeft: "2rem" }],
    ["new price", { justifySelf: "left", marginLeft: "2rem" }],
    "-",
    "",
    "-",
  ];
  return (
    <StyledMain>
      <Table>
        <Table.Window>
          <Table.Head gridColumn="1fr 1.5fr 0.3fr 1fr 1fr 1fr 0.2fr 1fr" labels={labels} />

          <Table.Body>
            {isLoading && <Spinner />}
            {!isLoading && !meta.length && <DisplayAltMessage message="No active supply request" />}
            {!isLoading && meta.length && supplies.map((supply) => <SupplierItem supply={supply} key={supply.id} />)}
          </Table.Body>

          <Table.Footer total={meta.total} consumed={meta.consumed} page={meta.page} next={meta.available} prev={meta.previous} />
        </Table.Window>
      </Table>
    </StyledMain>
  );
}

export default Supplier;
