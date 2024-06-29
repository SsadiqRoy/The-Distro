import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { Button } from "../components/elements";

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFilter = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);
  flex-grow: 0;

  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;

  > * {
    flex-shrink: 0;
  }

  span {
    padding: 1rem;
    border: 2px solid var(--cl-border);
    border-radius: var(--radius-small);
    text-transform: capitalize;
    cursor: pointer;

    &.active {
      background-color: var(--cl-border);
    }
  }
`;

const StyledContent = styled.div`
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);
  flex-grow: 1;

  display: flex;
  flex-direction: column;
`;

const StyledHead = styled.div`
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--cl-border);

  display: grid;
  grid-template-columns: ${(props) => props.$gridColumn};
  column-gap: 1rem;
  align-items: center;
  justify-items: center;
`;

const StyledBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  height: 20rem;

  &::-webkit-scrollbar {
    appearance: none;
    -moz-appearance: none;
    display: none;
  }
`;

const StyledFooter = styled.div`
  padding-top: 1rem;
  border-top: 2px solid var(--cl-border);

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 1rem;
  }
`;

/*










*/

// const TableContext = createContext();

function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}

function Filter({ filters }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("filter");

  function setFilter(filter) {
    setSearchParams((curr) => {
      return { ...curr, filter };
    });
  }
  return (
    <StyledFilter>
      {filters.map((filter) => (
        <span className={active === filter && "active"} onClick={() => setFilter(filter)} key={filter}>
          {filter}
        </span>
      ))}
    </StyledFilter>
  );
}

function Window({ children }) {
  return <StyledContent>{children}</StyledContent>;
}

function Head({ labels, gridColumn }) {
  return (
    <StyledHead $gridColumn={gridColumn}>
      {labels.map((label) => (
        <span>{label}</span>
      ))}
    </StyledHead>
  );
}

function Body({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

function Footer({ total, consumed, next, prev }) {
  return (
    <StyledFooter>
      <p>
        <strong>{consumed}</strong> out of <strong>{total}</strong>
      </p>

      <div>
        <Button $shape="square" $outlined={true} $size="small" $display="flex">
          <span>
            <HiChevronLeft />
          </span>
          prev
        </Button>
        <Button $shape="square" $outlined={true} $size="small" $display="flex">
          next
          <span>
            <HiChevronRight />
          </span>
        </Button>
      </div>
    </StyledFooter>
  );
}

Table.Filter = Filter;
Table.Window = Window;
Table.Head = Head;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
