import styled from "styled-components";
import SupplierItem from "../markups/SupplierItem";

const StyledMain = styled.main`
  width: 100%;
  height: 10rem;
  flex-grow: 1;
  padding-right: 1.5rem;

  overflow: auto;
  position: relative;
`;
const TableHead = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-bottom: 1px solid var(--cl-border-opacity);
  text-transform: capitalize;

  position: sticky;
  top: 0;
  z-index: 2;

  display: grid;
  grid-template-columns: 1fr 1.5fr 0.3fr 1fr 1fr 1fr 0.2fr 1fr;
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
`;

/*




*/

function Supplier() {
  return (
    <StyledMain>
      <TableHead>
        <span>image</span>
        <span>name</span>
        <span>quantity</span>
        <span>current Prices</span>
        <span>new prices</span>
        <span>-</span>
        <seperatebuttons></seperatebuttons>
        <span>-</span>
      </TableHead>
      {Array.from({ length: 24 }).map((item, i) => (
        <SupplierItem key={i} id={i} />
      ))}
    </StyledMain>
  );
}

export default Supplier;
