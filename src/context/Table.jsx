import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Button } from "../components/elementComponents";
import { fromSearchString } from "../utilities/utilities";
import { useState } from "react";

//

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFilter = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  overflow: auto;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;

  @media (max-width: 37.5em) {
    justify-content: unset;
  }

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
  overflow: auto;
  width: 100%;

  display: flex;
  flex-direction: column;

  > * {
    min-width: 800px;
  }
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
  height: 30rem;

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
  // * filter format [{name: 'all', value: '?sort=-createdAt'}]
  const [, setSearchParams] = useSearchParams();
  const [active, setActive] = useState("");

  function setFilter(filter) {
    setSearchParams(filter);
    setActive(filter);
  }

  return (
    <StyledFilter>
      {filters.map((filter) => (
        <span className={active === filter.value ? "active" : ""} onClick={() => setFilter(filter.value)} key={filter.name}>
          {filter.name}
        </span>
      ))}
    </StyledFilter>
  );
}

function Window({ children }) {
  return <StyledContent>{children}</StyledContent>;
}

//

function Head({ labels, gridColumn }) {
  return (
    <StyledHead $gridColumn={gridColumn}>
      {labels.map((label) => {
        let style = {};
        if (typeof label === "object") [label, style] = label;

        return (
          <span style={style} key={label}>
            {label}
          </span>
        );
      })}
    </StyledHead>
  );
}

//

function Body({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

//

function Footer({ total = 0, consumed = 0, next = 0, prev = 0, page = 1 }) {
  const [, setSearchParams] = useSearchParams();

  const handlePrev = () =>
    setSearchParams(() => {
      let filters = window.location.search;
      filters = fromSearchString(filters);

      return { ...filters, page: page - 1 };
    });
  const handleNext = () =>
    setSearchParams(() => {
      let filters = window.location.search;
      filters = fromSearchString(filters);

      return { ...filters, page: page + 1 };
    });

  return (
    <StyledFooter>
      <p>
        <strong>{consumed}</strong> out of <strong>{total}</strong>
      </p>

      <div>
        {prev ? (
          <Button onClick={handlePrev} $shape="square" $outlined={true} $size="small" $display="flex">
            <span>
              <HiChevronLeft />
            </span>
            prev
          </Button>
        ) : (
          <Button disabled={true} $shape="square" $outlined={true} $size="small" $display="flex">
            <span>
              <HiChevronLeft />
            </span>
            prev
          </Button>
        )}
        {next ? (
          <Button onClick={handleNext} $shape="square" $outlined={true} $size="small" $display="flex">
            next
            <span>
              <HiChevronRight />
            </span>
          </Button>
        ) : (
          <Button disabled={true} $shape="square" $outlined={true} $size="small" $display="flex">
            next
            <span>
              <HiChevronRight />
            </span>
          </Button>
        )}
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
