import { Outlet } from "react-router-dom";
import DashboardHeading from "./DashboardHeading";
import styled from "styled-components";
import DashboarSidebar from "./DashboarSidebar";

const Cover = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  height: 100dvh;
  margin-inline: auto;
  padding-block: 2rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cl-bg-light);
  padding: 2rem 3rem;
  border-radius: var(--radius-normal);

  position: relative;

  display: grid;
  grid-template-columns: 1fr 4.5fr;
  gap: 3rem;

  @media (max-width: 68.75em) {
    display: block;
    position: relative;
  }
  @media (max-width: 37.5em) {
    padding: 1rem;
    border-radius: 0;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  gap: 2rem;
  flex-direction: column;

  > :nth-child(2) {
    flex-grow: 1;
  }
`;

function DashboardLayout() {
  return (
    <Cover>
      <Container>
        <DashboarSidebar />

        <Main>
          {/* <DashboardHeading /> */}
          <Outlet />
        </Main>
      </Container>
    </Cover>
  );
}

export default DashboardLayout;
