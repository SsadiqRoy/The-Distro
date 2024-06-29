import styled from "styled-components";
import SupplierItem from "../markups/SupplierItem";

const StyledMain = styled.main`
  width: 100%;
  height: 10rem;
  flex-grow: 1;

  overflow: auto;
`;

function Supplier() {
  return (
    <StyledMain>
      {Array.from({ length: 24 }).map((item, i) => (
        <SupplierItem key={i} id={i} />
      ))}
    </StyledMain>
  );
}

export default Supplier;
