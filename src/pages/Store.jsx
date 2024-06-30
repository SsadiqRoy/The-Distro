import styled from "styled-components";
import StoreItem from "../markups/StoreItem";

const StyledMain = styled.main`
  width: 100%;
  height: 10rem;
  flex-grow: 1;
  padding-right: 1.5rem;

  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;
`;
function Store() {
  return (
    <StyledMain>
      {Array.from({ length: 25 }).map((item, i) => (
        <StoreItem key={i} />
      ))}
    </StyledMain>
  );
}

export default Store;
