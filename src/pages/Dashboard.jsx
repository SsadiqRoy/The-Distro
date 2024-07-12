import styled from "styled-components";
import Table from "../context/Table";
import DashboardHeading from "../layouts/DashboardHeading";
import { Growth, ImmediatPurchases, ProfitShareItem, SalesShareItem, Summary } from "../components/SupportDashboard";

const StyledDashboard = styled.div`
  width: 100%;
  height: 20rem;
  overflow-y: auto;
  padding-right: 1rem;
`;
const SharesContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow: auto;

  @media (max-width: 43.75em) {
    display: block;

    > * {
      width: 100%;
      margin-block: 1rem;
    }
  }

  > * {
    flex-grow: 1;
  }

  &::-webkit-scrollbar {
    display: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;
const GrowthContainer = styled.div`
  padding: 1.5rem;
  border-radius: var(--radius-normal);
  background-color: var(--cl-bg-white);
  margin-block: 3rem;
  overflow-x: auto;

  > div {
    min-width: 800px;

    strong {
      font-size: 2rem;
    }

    > *:not(:nth-child(2)) {
      margin-left: 2rem;
    }
  }

  .chart {
    height: 30rem;
    margin-block: 1rem;
  }

  .graphs {
    overflow: auto;

    display: flex;
    align-items: center;
    gap: 2rem;

    > * {
      flex-shrink: 0;
    }

    &::-webkit-scrollbar {
      display: none;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }
  }
`;

/*








*/

function Dashboard() {
  return (
    <>
      <DashboardHeading sort={false} />

      <StyledDashboard>
        <Summary />

        <SharesContainer>
          <SalesShareItem />
          <ProfitShareItem />
        </SharesContainer>

        <GrowthContainer>
          <Growth />
        </GrowthContainer>

        <Table>
          <Table.Window>
            <strong style={{ fontSize: "2rem", padding: "1rem", marginBottom: "1rem" }}>Purchase Requests</strong>
            <Table.Head
              labels={["image", "name", "quantity", "unit price", "total price", "available", "-", "-"]}
              gridColumn="1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr"
            />

            <Table.Body>
              <ImmediatPurchases />
            </Table.Body>
          </Table.Window>
        </Table>
      </StyledDashboard>
    </>
  );
}

export default Dashboard;

/*




*/
